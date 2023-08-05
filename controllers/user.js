const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const factory = require('../utils/crudBuilder');
const sendEmail = require('../utils/sendEmail');


exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);


exports.userData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-__v -password')
  if(user){
    res.status(200).json({ data: user });
  }else{
    res.status(401).json({ msg: 'user not found' });

  }
});



exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

  exports.updateUserPassword = asyncHandler( async (req, res, next) => {
    let {password, newPassword} = req.body;
    const user = await User.findOne({ _id: req.user.id });

    if(user)
    {
      let valid = bcrypt.compareSync(password, user.password);

        if(valid){
          try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);
            newPassword = hashedPassword;
            const user = await User.findByIdAndUpdate(
              req.user.id,
              {password:newPassword},
              {
                new: true,
              }
            );
    
            res.status(200).json({ data: user });
          } catch (error) {
            console.log(error);
            res.status(400).send("server error");
          }
            
        }
        else{
          res.status(400).json({ error: 'invalid password' });
        }
    }
    else{
      res.status(400).json({ error: 'user not found' });
    }

  });

// 640f2bdd4f6e4a1982bed4f5
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmMmJkZDRmNmU0YTE5ODJiZWQ0ZjUiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2Nzg3MTY0MzgsImV4cCI6MTY3ODc1OTYzOH0.f0M1Iar-3h_VScWptF3CKlPoSw0Pq_52t39asfMvHNo 

exports.register = asyncHandler( async (req, res) => {
  const { name, email, password,role } = req.body;
  const verifyEmailCode = Math.floor(Math.random()  * 1000000).toString();

  console.log(password);
  const newUser = await User.create({
    name,
    email,
    password,
    verifyEmailCode,role
  });
  

  // console.log(newUser);

  const mailObj = {
    from: `Amazon <${process.env.USER_EMAIL}>`,
    to: email,
    subject: 'Verify Email',
    html: `
    <img src="https://cdn2.downdetector.com/static/uploads/logo/amazon.png" width="300"/>
    <h1>Verify your email address</h1>
    <p>To verify your email address, please use the following One Time Password (OTP): <b>${verifyEmailCode}</b> </p>
    `,
  };

    sendEmail(mailObj);    

  res.status(201).json({ message: 'check your email address to activate your account' });
});


exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const {email, verifyEmailCode} = req.body;
  const user = await User.findOne({ email });

  if(user){
      if(user.verifyEmailCode === verifyEmailCode){
        user.isActive = true;
        user.verifyEmailCode = '';
        user.save();
        
        res.status(200).json({ message: 'Email verified successfully' });
      }
      else{
        res.status(401).json({ message: 'invalid verified code' });
      }
  }
  else{
    res.status(401).json({ message: 'Email not found' });
  }

  // console.log(email, verifyEmailCode);
});


exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const {email} = req.body;
  const user = await User.findOne({ email });

  if(user){
    const restCode = Math.floor(Math.random()  * 1000000).toString();
    const salt = bcrypt.genSaltSync(10);
    user.passwordResetCode = bcrypt.hashSync(restCode, salt);
    user.passwordResetExpires = Date.now() + 600000;
    user.passwordResetVerified = false;
    await user.save();

    const mailObj = {
      from: `Amazon <${process.env.USER_EMAIL}>`,
      to: email,
      subject: 'Rest Your Password',
      html: `
      <img src="https://cdn2.downdetector.com/static/uploads/logo/amazon.png" width="300"/>
      <h1>Password assistance</h1>
      <p>To Rest Your Password, please use the following One Time Password (OTP): <b>${restCode}</b> </p>
      `,
    };
  
      sendEmail(mailObj);    
  
    res.status(201).json({ message: 'check your email address to rest your password' });
  }
  else{
    res.status(401).json({ message: 'Email not found' });
  }
});



exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const {email, restCode} = req.body;
  const user = await User.findOne({ email });

  if(user){
    let valid = bcrypt.compareSync(restCode, user.passwordResetCode);

    if(valid && (user.passwordResetExpires > Date.now())){
      user.passwordResetVerified = true;
      user.save();
      
      res.status(200).json({ message: 'Success Validation' });
    }
    else{
      res.status(401).json({ message: 'invalid rest password code' });
    }
  }
  else{
    res.status(401).json({ message: 'Email not found' });
  }
});


exports.resetPassword = asyncHandler(async (req, res, next) => {
  let { email, newPassword } = req.body
    const user = await User.findOne({ email })
    if (user && user.isActive) {
      if (user.passwordResetVerified) {
        user.password = newPassword
        user.passwordResetCode = ''
        user.passwordResetExpires = null;
        user.passwordResetVerified = false;

        user.save();

        const token = jwt.sign({
          userId: user._id,
          userRole: user.role
        }, process.env.SECRET, { expiresIn: '12h' });
 
        res.status(200).json({msg:"password rest successfuly",token})
      } else {
        res.status(401).json({ message: "rest password code is not verified" });
      }
    } else {
      res.status(401).json({ message: "user not found" })
    }
  
});


exports.login = asyncHandler( async (req, res) => {

    let { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && user.isActive) {
      let valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const token = jwt.sign({
          userId: user._id,
          userRole: user.role
        }, process.env.SECRET);
  
        res.status(200).json({token})
      } else {
        res.status(401).json({ message: "invalid password" });
        
      }
    } else {
      res.status(401).json({ message: "user not found" })
    }
  
  });






  exports.deactivateUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
  
    res.status(200).send('deactivate user Success');
  });
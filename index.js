const express = require('express');
const app = express();

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const dbConnection = require('./config/db');

const port = process.env.PORT || 5000;
const environment = process.env.ENVIRONMENT || 'development';

dbConnection();


const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const cartRouter = require('./routes/cart');
const CategoryRouter = require('./routes/category');
const SubCategoryRouter = require('./routes/subCategory');
const ProductRouter = require('./routes/product');
const OrderRouter = require('./routes/order');




app.use(cors());
app.use(express.json());


if (environment === 'development') {
    app.use(morgan('common'));
  }


app.get('/',(req,res)=>{
    res.send('Start API');
});

app.use('/users',userRouter);
app.use('/reviews',reviewRouter);
app.use('/carts',cartRouter);
app.use('/categorys',CategoryRouter);
app.use('/subCategorys',SubCategoryRouter);
app.use('/products',ProductRouter);
app.use('/orders',OrderRouter);


app.all('*', (req, res, next) => {
    res.status(404).json({err:'path not found'});

});


// app.use((err, req, res, next)=>{
//     res.status(400).json({err});
// })


app.listen(port,()=>{
    console.log(`Start Server on http://localhost:${port}/`);
});
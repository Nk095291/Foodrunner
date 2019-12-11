const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");


const viewRouter = require('./router/viewRouter');
const userRouter = require('./router/userRoute');

const port = 4000;

// to use "public" directory to serve static file like css,js,images in view engine
app.use(express.static('public'));
app.use(express.json());
// cookie parser
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use('/',viewRouter);

app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
})
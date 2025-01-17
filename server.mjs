import express from 'express'
import userRouter from './src/Routers/user.mjs'
import product from './src/Routers/product.mjs';
import test from './src/Routers/test.mjs';
import mid from './src/Routers/midleware.mjs';

//execute express
const server = express();

//using json midle ware for the catch json data coming from post (create user)
server.use(express.json());


//use routers
server.use(userRouter);
server.use(product);
server.use(test);
server.use(mid);


server.listen(4000,()=>{
    console.log('server running...');
})
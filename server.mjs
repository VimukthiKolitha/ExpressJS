import express from 'express'
import userRouter from './src/Routers/user.mjs'
import product from './src/Routers/product.mjs';

//execute express
const server = express();

//using json midle ware for the catch json data coming from post (create user)
server.use(express.json());


//use routers
server.use(userRouter);
server.use(product);


server.listen(4000,()=>{
    console.log('server running...');
})
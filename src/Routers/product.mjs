import { Router } from "express";
import {productInfo} from '../userInfo/productInfo.mjs'

const product = Router();

//using path param
//get items by id
//ex:http://localhost:4000/api/v2/useInfo/productID/2
product.get('/api/v2/useInfo/productID/:id',(req,res) =>{
  const data = productInfo.find((p) => p.id === Number(req.params.id));

  res.status(200);
  res.json({
    msg:'product data',
    data:data,
  })
});


export default product;
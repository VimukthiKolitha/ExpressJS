import { Router } from "express";
import {log} from "console";
import testmid from "../utils/midle.mjs"

const mid = Router();

//test mid coming from utils
mid.get('/api/v2/Router/mid',testmid,
    
 (req,res,next) =>{
    log('2');
    next();
},(req,res) =>{
    log('3');
})
export default mid;
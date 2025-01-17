import { Router } from "express";
import {log} from "console";
import testmid from "../utils/midle.mjs"
import { checkSchema, matchedData, query, validationResult } from "express-validator";

const mid = Router();

//test mid coming from utils
mid.get('/api/v2/Router/mid',testmid,
    
 (req,res,next) =>{
    log('2');
    next();
},(req,res) =>{
    log('3');
})

//validate name using 'express-validator'
//'query("name")' means we mention name in endpoint (ex:http://localhost:4000/abc?name=13)
//in here i am checking is name email and is age Numeric value
mid.get('/abc',query("name").isEmail().withMessage('this is not an email'),query('age').isNumeric().withMessage('this is not boolean'),(req,res) =>{
   const r = validationResult(req);
   //match data catch
   const match = matchedData(req);

   console.log(r.array());
   console.log(match);
   res.sendStatus(200);
})

//mech schema method
//ex:http://localhost:4000/efg?age=we
mid.get('/efg',checkSchema({
    name:{
        //check is name email
        isEmail:{
          errorMessage:'not an email'
        }
    },
    age:{
        //check is age number
        isNumeric:{
            errorMessage:'not a number'
        }
    }
}),(req,res) =>{
    const r = validationResult(req);
    const d  = matchedData(req);

    console.log(r.array());
    console.log(d);

})
export default mid;
import { Router } from "express";
import {log} from "console"

//midleware

const test = Router();

test.get('/api/v2/Router/test',(req,res,next) =>{

    log('1');
    //if we send responce in first there is no reason for go to the next 
    //res.sendStatus(200);

    //if
    if(req.method == 'GET')
    {
       //execute next for go to next 
       return next();
    }
    //else
    res.sendStatus(200);
},(res,req,next) =>{
    log('2');

    next();
},(req,res) =>{
    log('3');
    res.sendStatus(200);
}
);

export default test;
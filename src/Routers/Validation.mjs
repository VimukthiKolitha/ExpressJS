import { body,query } from "express-validator";
import { ExpressValidator } from "express-validator";

//expoert this to user.mjs
export const regnVal = [
    body('UserName').notEmpty().withMessage('user name canot be empty'),
    body('Password').notEmpty().withMessage('password can not be empty '),
    body('Name').notEmpty().withMessage('name canot be empty')
]

export const logval = (...key) =>{

    const log = [];

    key.forEach((k)=>{
        log.push(body(k).notEmpty().withMessage(`please enter the ${k}`));
    });

    return log;
};
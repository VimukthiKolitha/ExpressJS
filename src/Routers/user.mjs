import { Router } from "express";
import { checkSchema, matchedData, query, validationResult } from "express-validator";

//import { data } from "../userInfo/userInfo.mjs";
import { PrismaClient } from '@prisma/client';

//import login validation file
import { regnVal } from "./Validation.mjs";

//import login error file
import {loginError} from "../utils/errormsgCreate.mjs"

import { logval } from "./Validation.mjs";

const DB = new PrismaClient();

const userRouter = Router();

//get all users
userRouter.get('/api/v1/user/allUsers',async (req,res) =>{
    const userdata = req.query;
    console.log(userdata);
    try {
       
        const allUsers = await DB.user.findMany()
        return res.status(201).json({allUsers});
    } catch (error) {
        console.log(error);
       return res.status(500).json({
          data:'null',
          msg:'no users'
       });
    }
})
//get user by is
//when you using this api 'UserID' after this part add ? and user id
userRouter.get('/api/v1/user/UserID',async (req,res) =>{
    //distructure id
    const {id} = req.query;
    //if user id defined
    if(id !== undefined && id !== '')
    {
        try {
            const IdUser = await DB.user.findUnique({
                where:{
                    //convert string to number
                    Id:Number(id)
                }
            });
            return res.status(200).json({IdUser});
        } catch (error) {
            console.log(error);
            return res.status(500).json({
               data:'null',
               msg:'no user'
            });
        }
    }
    return res.status(500).json({
        msg:'null',
        data:'something went wrong'
    })
})

//create new user
//create database connecttions as async function
/*api post req :
{
    "Name":"asela",
    "UserName":"kolitha",
    "Password":"123"
}
    */
userRouter.post("/api/v1/user/Create-user",async(req,res)=>{
    const userdata = req.body// Get  data from the request body
    console.log(userdata);
   
    //user data store in database
    try {
        //User means schema.prisma db table name
        const newUser  = await DB.user.create({data:userdata});
        return res.status(201).json({newUser});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
           data:'null',
           msg:'can not create user'
        });
    }
});

//update user
userRouter.put('/api/v1/user/update',async(req,res) =>{
    const {id} = req.query// Get ID from query parameters
    const updateUser = req.body// Get update data from the request body
    if(id !== undefined && id !=="")
    {
        try {
            const update = await DB.user.update({
                where:{
                      Id:Number(id)
                },
                data:updateUser
            });

            return res.status(200).json({
                msg:'Updated',
                data:update
            })
        } catch (error) {

            console.log(error);
            return res.status(500).json({
                data:'null',
                msg:'can not update user'
            })
        }
    }
    return res.status(500).json({
        msg:'something went wrong',
        data:'null'
    })  
})

//delete user
userRouter.delete('/api/v1/user/dalete', async(req,res) =>{
    const {id} = req.query

    if(id !== undefined && id !== '')
    {
       try {
          const deleteUser = await DB.user.delete({
            where:{
                Id:Number(id)
            }
          })
         return res.status(200).json({
            msg:'user deleted',
            data:'deleteUser'
          });
       } catch (error) {
         
        return res.status(500).json({
            msg:'user delete fail',
            data:'null'
        })
       }
    }
    return res.status(500).json({
        msg:'something went wrong',
        data:'null'
    })
})
//register 

/*http://localhost:4000/api/Roters/login

json body
{
    "Name":"",
    "UserName":"sergio",
    "Password":"12323"
} */
userRouter.post('/api/Roters/register',regnVal,async(req,res) =>{
    const error = validationResult(req);
    const logErr = loginError(error.array());
    
    if(error.array().length)
    {
        return res.status(400).json({
            msg:'Error',
            error: logErr,
            data:null
        });
    }

    const data = matchedData(req)
try {
    await DB.user.create({data});
    return res.status(500).json({
        msg:'User Created',
        error: 'null',
        data:'null'
    });

} catch (error) {
    console.log(error);
    //check if user already exist
    if(error.code === 'P2002')
    {
        return res.status(201).json({
            msg:'error',
            error:'User already exist',
            data:'null',
        });
    }

    return res.status(500).json({
        msg:'error',
        error:'database error',
        data:'null',
    });
}
});

//login

//http://localhost:4000/api/Router/login
/*{
  "UserName": "blaze",
  "Password":"28"
}*/
userRouter.post('/api/Router/login',logval('UserName','Password'),async(req,res)=>{
    
    const error = validationResult(req);
    const logErr = loginError(error.array());
    
    if(error.array().length)
    {
        return res.status(400).json({
            msg:'Error',
            error: logErr,
            data:null
        });
    }
    const data = matchedData(req)

    try {
        const user = await DB.user.findUnique({where:{UserName:data.UserName}});

        //check password
        if(user !== null)
        {
          if(user.Password === data.Password)
          {
            return res.status(201).json({
                msg:'okey',
                error: 'Successfully login',
                data:null
            });
          }

          return res.status(404).json({
            msg:'Error',
            error: 'password incorect',
            data:null
        });
        }
        return res.status(404).json({
            msg:'Error',
            error: 'user not found',
            data:null
        });
    } catch (error) {
        return res.status(400).json({
            msg:'Error',
            error: 'database error',
            data:null
        });
    }
})

export default userRouter;
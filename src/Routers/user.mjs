import { Router } from "express";
//import { data } from "../userInfo/userInfo.mjs";

import { PrismaClient } from '@prisma/client';
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
//login
//register

export default userRouter;
import { Router } from "express";
import { data } from "../userInfo/userInfo.mjs";

import { PrismaClient } from '@prisma/client';
const DB = new PrismaClient();


const userRouter = Router();

//get all users
userRouter.get('/api/v1/user/allUsers',(req,res) =>{
    res.status(200);
    res.json({
        msg:'users data',
        data:data,
    });
})
//get user by is
//when you using this api 'UserID' after this part add ? and user id
userRouter.get('/api/v1/user/UserID',(req,res) =>{
    //distructure id
    const {id} = req.query;
    //if user id defined
    if(id!== undefined && id !== '')
    {
        //user id comes as string i this poit we convert that string to integer number
        //ex:http://localhost:4000/api/v2/useInfo/productID?id = 1
        const user = data.find(u => u.id === Number(id));

        return  res.status(200).json({
            msg:'users data',
            data:user,
        });
    }
    //if user id undefined
     res.status(400);
     res.json({
        msg:'id not defene'
     })
})

//create new user
/*api post req :
{
    "Name":"asela",
    "UserName":"kolitha",
    "Password":"123"
}
    */
userRouter.post("/api/v1/user/Create-user",async(req,res)=>{
    const userdata = req.body
    console.log(userdata);
   
    //user data store in database
    try {
        //User means schema.prisma db table name
        const newUser  = await DB.User.create({data:userdata});
        return res.status(201).json({newUser});

    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});
//login
//register

export default userRouter;
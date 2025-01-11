import { Router } from "express";
import { data } from "../userInfo/userInfo.mjs";

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
//login
//register

export default userRouter;
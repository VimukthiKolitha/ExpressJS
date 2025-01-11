import express from 'express';

//execute express
const server = express();

//expecting get request from client
server.get('/',(req,res)=>{
console.log(req);
//send respond 
res.send('<h1>Vimukthi kolitha</h1>')
})

server.get('/',(req,res)=>{
    //when we send status it will automaticaly close req
    res.sendStatus(500);
    //because of close this res pond not sending
    res.json({msg:'error'})
})
server.listen(4000,()=>{
    console.log('server is running...!')
});
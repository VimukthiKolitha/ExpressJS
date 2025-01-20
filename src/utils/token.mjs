
//npm i jsonwebtoken
import jwt from 'jsonwebtoken'
//token are genereted when user login to web site

//token generator
export const tokengen = (payload) =>{

    //'sign' is use for create token
    //'payload' store user's unique details (userName(unique),role);
    // 'myKey' secrete part that unique for only this websiete.
  const token = jwt.sign(payload,'myKey')

  return token;
}
//after that copy token and go to jwt site and decord it

//decord token
export const decToken = (token) =>{

  //decord 
  const payload = jwt.decode(token);

  return payload;
}

//varify token

export const verify = (payload)=>{

  //inhere i am set fake signature 'kjsk'
  //if you use real sinature its work fine 'myKey'
   const veri = jwt.verify(payload,'myKey');

   return veri;
}

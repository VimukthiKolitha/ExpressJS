
//good looking error message
export const  loginError  = (error = []) =>{
const errormsg  = {};

for(const e of error)
{
    if(errormsg[e.path] !== undefined)
    {
        // Append the new message to the existing one
       const  msg = `${errormsg = [e.path]}, ${e.msg}`;
       errormsg [e.path] = msg
    }else{
        // Assign the message directly
        errormsg [e.path] = e.msg;
    }
}
return errormsg;
}
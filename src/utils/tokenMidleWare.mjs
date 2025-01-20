export const midleToke = (req,res,next) =>{
    //usualy tokens are send inside header not body
    const token = req.headers.authorization

    const payload  = decToken(token);

    if(payload === undefined)
    {
        return res.status(400).json({
            msg:'token indefine',
            data:'null'
        })
    }
    const a = verify(payload);
    
    console.log(a);

    next();
}
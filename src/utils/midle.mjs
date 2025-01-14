const testmid = ('/api/v2/Router/mid',(req,res,next)=>{
    if(req.method == 'GET')
    {
        return next();
    }
   log('1');
 })
 export default testmid;
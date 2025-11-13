export const auth=(req,res,next)=>{
    console.log("Admin Middleware executed");
    const token="admin123";
    const isAuthorized = token ==="admin123";
    if(!isAuthorized){
        res.status(403).send("Access Denied");
    }
    else{
        next(); }
};
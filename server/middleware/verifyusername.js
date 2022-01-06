exports.verifyUser = (req, res, next) => {
    if(req.body.username == 'admin')
    {
        next();
    }
    else{
        return res.status(403).send({ message: "Username plz enter proper.." });
    }  
};
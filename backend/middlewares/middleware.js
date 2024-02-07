const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")

const auth = (req,res,next)=>{
    const valuesHeader = req.headers.authorization;

    if(!valuesHeader || !valuesHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message:"header deffect"
        });
    }

    const token = valuesHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token , JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(411).json({
            message:"Something wrong in try/catch blokc in middleware auth"
        })
    }
};

module.exports = {
    auth
}
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log("inside auth")
try{
const token = req.header("x-auth-token");
console.log(token)
console.log("A")
if(!token){
    console.log("B")

return res.status(401).json({msg: "No authentication token, access denied",authentication:false});
}
console.log("C")

const verified = jwt.verify(token, "login,signup");
console.log("D")

console.log("verified : ",verified)
if(!verified){
    console.log("not verified")
return res.status(401).json({msg: "Token verification failed, authorization denied",authentication:false});
}
console.log("after verification")
//req.userid = verified.id;
//req.username=verified.username;

next();
} catch (err) {
    console.log("E")

res.json({ error: err.message,authentication:false });
}
}
module.exports = auth;
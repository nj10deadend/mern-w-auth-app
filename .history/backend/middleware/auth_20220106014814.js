const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    const token = req.header("token");
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Authentication Error" });
    } 

    try {
        const decoded = jwt.verify(token, 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA');
        console.log(decoded.user);
        req.user = decoded.user;
        console.log(req.user);
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }

}

// module.exports = auth;
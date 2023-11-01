const jwt = require("jsonwebtoken");

//JWT Secret key
const JWT_SECRET = process.env.REACT_APP_TOKEN_SECRET_KEY;

const fetchuser = (req, res, next) => {
  //Get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    //If the user cannot be verified,it will throw an error
    const data = jwt.verify(token, JWT_SECRET);

    //Here we are assigning the value of user's data to request's data
    req.user = data.user;
    //next() is used so that after the execution of this function,next middleware function should be called
    //which in this case is the async() in the route3
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

// };

module.exports = fetchuser;

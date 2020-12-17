require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3000/api',
	'http://localhost:3001/api',
  'http://localhost',
  'https://orona-yugioh-backend.herokuapp.com',
	'https://orona-yugioh-backend.herokuapp.com/api',
];
const corsOptions = {
	credentials: true,
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
};

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwt;
  // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  console.log("Cookies: ", req.cookies.jwt);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.user = decodedUser;
    // ADDS A .user PROP TO REQ FOR TOKEN USER
    console.log(decodedUser);

    next();
  });
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method"));

// HOMEPAGE
app.get("/", (req, res) => {
  res.json({ message: "express api app is working" });
});

app.use("/api/auth", require("./controllers/authController.js"));
app.use("/api/users", require("./controllers/usersController.js"));
app.use("/api/decks", require("./controllers/decksController.js"));
app.use("/api/cards", require("./controllers/cardsController.js"));

app.listen(process.env.PORT, () => {
  console.log("Nodemon listening");
});

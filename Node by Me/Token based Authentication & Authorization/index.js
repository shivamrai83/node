const express = require('express');
const app = express();
const { db, dataTable } = require("./db");
const md5 = require('md5');

//for generating a token by the help of jwt
const jwt = require('jsonwebtoken');

// for authentication middleware present in between
const passport = require("passport");

//passport-jwt Dependency to authorize every time
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const KEY = "hiiamshivamrai";

//setting up options for JwtStrategy which is used in middleware of passport for authentication
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = KEY;

//passport middleware used for the authentication on the bases of tokens
passport.use(
    new JwtStrategy(opts,async function(payload,done){
        const user = await dataTable.findOne({id:payload.id});

        if(!user){
            done(null,false);
        }
        done(null,JSON.parse(JSON.stringify(user)));
    })
);

//for token generation
function generateToken(payload) {
    return jwt.sign(payload, KEY);
}


app.use(express.json());
// app.use(express.urlencoded());
//to initialize a passport middelware
app.use(passport.initialize());


//the token generation takes place when user sends the user name and password to the server
app.post("/auth/login", async function (req, res) {
    const { name, password } = req.body;
    const user = await dataTable.findOne({ where: { name } });
    if (!user || user.password !== md5(password)) {
        res.send({ message: "wrong info" });
    }
    const users = JSON.parse(JSON.stringify(user));
    const jwt = generateToken(users);
    res.send({ token: jwt, user: user });
});

// app.get(
//     "/auth",
   
//     async function (request, response) {
//       response.send({ user: request.user });
//     }
//   );
// }

app.get("/", passport.authenticate("jwt", { session: false }), async function (request, response) {

    const dat = await dataTable.findAll({});
    // .then(()=>console.log("fetch data")).catch((e)=>console.log("err",e));

    console.log({ dat });
    response.send(dat);
});

app.post("/post", async function (req, res) {

    const { body } = req;
    const { id, name, password } = body;
    const done = await dataTable.create({
        id: id,
        name: name,
        password: md5(password),
    });
    const { password: db, ...userRest } = JSON.parse(JSON.stringify(done));
    res.send(userRest);
});

app.listen(3001, () => console.log(`Server is Running...`));


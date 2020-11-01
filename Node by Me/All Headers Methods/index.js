const express = require('express');
const app = express();
const { userTable, db } = require('./model/User');
const {adminTable} = require('./model/admin');
const {userController} = require('./controller/userController');
const{adminController}=require('./controller/adminController');
// app.get("/",(req, res)=>res.status(200).send("hey i m on"))


app.use(express.json())
userController(app);
adminController(app);
// app.get("/", async function (req, res) {
//     const data = await userTable.findAll({});
//     res.send(data);
// });

app.listen(1698, console.log("Server is Running....."));
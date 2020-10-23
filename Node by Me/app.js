var express = require("express");

var app = express();
var db = require("./index.js");
const { sequelize }=require("./index.js");

app.use(express.json());
app.use(express.urlencoded());


app.get("/get",async function(_, response){
    let dat=await sequelize.nodeDB.findAll({});
    console.log(dat);
    response.status(201).send(dat);
});


db.init().then().catch();
app.listen(3000,()=>console.log(`Server is Running...`));

// var userData =[
//     {'name':"shivam", 'id':1},
//     {'name':"prince", 'id':2},
//     {'name':"ameer", 'id':3},
//     {'name':"dev",'id':4}
// ];

// app.get('/',(request, response)=>{
//     response.status(200).send(userData);
//     // console.log(request);
// })

// app.post('/data',(request, response)=>
// {
    
//     userData.push(request.body);
//     response.status(201).send(userData);
    
// });

// app.put('/put/:id',(request, response)=>{
// const user = books.find(c=> c.id === parseInt(req.params.id));
// user.name=request.body.name;
// response.send(userData);
// });

// app.delete('/del/:id',(request, response)=>{
//     let id=request.params;
//     console.log(id);
//     let arr=userData.filter((_,index)=>id!=index);
//     console.log(arr);
// });






























// var a=["shivam","rai","GET"];

// app.use(bodyParser.json());


// app.get("/", (req, res) => {
   
//     res.status(200).send(a);
//    });


// app.post("/",(req,res)=>{
//     // function s(res){
//     //     for(let v in res){
//     //         res[v];
//     //     }
//     // }
//     res.status(201).send();
    
// });
// app.listen(3000,()=>console.log("shivamrai"));

// const bodyParser = require('body-parser'); 
// app.use(bodyParser.json());
// var XMLHttpRequest = require("XMLHttprequest").XMLHttpRequest;
// var http = new XMLHttpRequest();
// // var http = new XMLHttpRequest();

// var url="https://reqres.in/api/unknown";
// http.open('GET',url);
// http.send();

// http.onreadydtatechange=(e)=>{
//     console.log(Http.responseText);
// }
// app.post('/dogs', function(req, res) {
//     var dog = req.body;
//     console.log(dog);
//     dogsArr.push(dog);
//     res.send("Dog added!");
// });

// app.listen(3000, () => {
//  console.log("Server running on port 3000");
// });
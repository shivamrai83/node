const {Sequelize} = require('sequelize');

const db =new Sequelize({
    dialect: "postgres", 
    host: "localhost",
    port: 5432,
    username: "postgres", 
    password: "root",
    database: "samdb", 
});

const userTable = db.define("user",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    technology:{
        type:Sequelize.STRING,
        allowNull:false,
    },
},
{logging:false, createdAt:false, updatedAt:false}
);

db.authenticate().then(()=>console.log("database authenticate....."));
db.sync({alter:true}).then(()=>console.log("alter alos true....."));

module.exports={userTable,db};
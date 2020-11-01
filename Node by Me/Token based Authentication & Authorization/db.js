const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
    dialect: "postgres", //database
    host: "localhost",
    port: 5432,
    username: "postgres", //set as user
    password: "root",
    database: "samdb",       //database name
});

//creating Model
const dataTable = db.define(
    "shivam",
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },
    { createdAt: false, updatedAt: false, logging:false }
);

db.authenticate().then(()=>console.log("sucessfully connected")).catch(e=>console.log("error",e));
    db.sync({alter:true}).then(()=>console.log("alter true")).catch(e=>console.log("error",e));

// const init=async function(){
//     try{
//         await sequelize.authenticate();
//         await sequelize.dataTable.sync({alter:true});
//         // const data = await dataTable.findAll({});

//     }
//     catch(e){
//         console.log("Error.....",e);
//     }
// }
module.exports={db,dataTable};
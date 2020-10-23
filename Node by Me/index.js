const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({   //It only stablize the connection
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "node",
  
});
 // it creates the table (the first name passed in the parameters) & after that the table columns which is present in it which specifys the all details in it.
const MasterKey = sequelize.define(
  "nodeDB",// database name
  {
      id:{
        type:DataTypes.INTEGER ,
        allowNull:false,
        primaryKey:true,
      },
    name: {
        type: DataTypes.STRING,
      },
     
  },
  { createdAt: false, updatedAt: false }
);

const init = async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
    const data = await MasterKey.findAll({});

    console.log("db > init > data", data);
  } catch (error) {
    console.log("db > init > ", error);
  }
};
module.exports={
  init,
  sequelize
};
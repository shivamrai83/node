const { json } = require('sequelize/types');
const { userTable, db } = require('../model/User');
const md5 = require('md5');

function userController(app) {
    app.get("/", async function (req, res) {
        const data = await userTable.findAll({});
        res.status(200).send(data);
    });
    app.post("/", async function (req, res) {
        const { body } = req;
        const { id, name, password, technology } = body;
        const add = userTable.create({
            id: id,
            name,
            password,
            technology,
        });
        // const {password: dbPassword, ...userWithNoPass}=json.parse(
        //   JSON.stringify(add) 
        // );
        res.send(add);
    });

    app.delete("/:id", async function (req, res) {
        const { id } = req.params;
        const delval = await userTable.findOne({ id });
        const deleted = await delval.destroy();
        res.send({ deleted });
    })
}

module.exports = { userController, };
const { adminTable } = require('../model/admin');

function adminController(app) {
    app.get("/admin", async function (req, res) {
        const data = await adminTable.findAll({});
        res.send(data);
    });
    app.post("/admin", async function (req, res) {
        const { body } = req;
        const { name, technology } = body;
        const add = await adminTable.create({
            id: id,
            name,
            technology,
        });
        res.send(add);
    });

    app.put("/admin/:id", async function (req, res) {
        const { id } = req.params;
        const user = await adminTable.findOne({ id });
        const { body } = req;
        const { name, technology } = body;
        user.name = name ? name : user.name;
        user.technology = technology ? technology : user.technology;
        await user.save();
        res.status(200);
    });
}

module.exports = { adminController, }
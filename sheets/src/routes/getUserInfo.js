const { authOrFail } = require("../auth");
const fp = require("fastify-plugin")

module.exports.getUserInfo = fp(async (app) => {
    app.get("/user", authOrFail(async (req, res) => {
        console.log(req.userInfo)
        return res.send({
            userInfo: req.userInfo,
        })
    }))
});
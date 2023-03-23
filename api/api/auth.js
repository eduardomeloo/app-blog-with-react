const bcrypt = require("bcryptjs");

module.exports = app => {
    const register = async (req, res) => {
        const {username, password} = req.body;
        try {
            const salt = bcrypt.genSaltSync(10)
            const userDoc = await app.modelUser.create({
                username, 
                password: bcrypt.hashSync(password, salt)
            });
            res.json(userDoc)
        } catch (error) {
            res.status(400).json(error);
        }
    }

    const login = async (req, res) => {
        const {username, password} = req.body;
        const userDoc = await app.modelUser.findOne({username})
        res.json(userDoc)
    }

    return { register, login }
}
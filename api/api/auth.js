const bcrypt = require("bcryptjs");
const jwt    = require('jsonwebtoken');

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
        const userDoc = await app.modelUser.findOne({username});
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({username, id:userDoc._id}, process.env.SECRET_KEY, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('ok');
            })
            
        } else {
            res.status(400).json('wrong credentials')
        }
    }

    const profile = async (req, res) => {
        const {token} = req.cookies;
        jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });

        //res.json(req.cookies);
    }

    return { register, login, profile }
}
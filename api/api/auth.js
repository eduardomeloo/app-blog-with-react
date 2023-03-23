module.exports = app => {
    const register = async (req, res) => {
        const {username, password} = req.body;
        const userDoc = await app.modelUser.create({username, password});
        res.json(userDoc)
    }    

    return { register }
}
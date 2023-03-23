module.exports = app => {
    const register = async (req, res) => {
        const {username, password} = req.body;
        try {
            const userDoc = await app.modelUser.create({username, password});
            res.json(userDoc)
        } catch (error) {
            res.status(400).json(error);
        }
    }    

    return { register }
}
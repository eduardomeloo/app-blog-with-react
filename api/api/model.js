module.exports = app => {
    const test = async (req, res) => {
        res.json('test ok')
    }    

    return { test }
}
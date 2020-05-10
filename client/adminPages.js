const router = require('express').Router()
const { getInfo } = require("./getInfo")

router.get('/', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/admin/home', {userInfo: userInfo})
})
router.get('/profile', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/admin/profile', {userInfo: userInfo})
})

module.exports = router
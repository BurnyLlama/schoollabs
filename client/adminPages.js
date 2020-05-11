const router = require('express').Router()
const { getInfo } = require("./getInfo")
const News = require('../models/News')

router.get('/', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    const news = await News.find()
    news.reverse()
    res.render('pages/admin/home', {userInfo: userInfo, news: news})
})
router.get('/profile', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/admin/profile', {userInfo: userInfo})
})

module.exports = router
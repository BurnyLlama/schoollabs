const router = require('express').Router()
const { getInfo } = require("./getInfo")
const News = require('../models/News')

router.get('/', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    const news = await News.find()
    news.reverse()
    res.render('pages/hub/home', {userInfo: userInfo, news: news})
})
router.get('/profile', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/hub/profile', {userInfo: userInfo})
})
router.get('/schedules', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/hub/schedules', {userInfo: userInfo})
})

module.exports = router
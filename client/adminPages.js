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
router.get('/users', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/admin/users', {userInfo: userInfo})
})
router.get('/schedules', async (req, res) => {
    const userInfo = await getInfo(req.cookies.token)
    res.render('pages/admin/schedules', {userInfo: userInfo})
})

module.exports = router
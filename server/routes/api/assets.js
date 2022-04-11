const express = require('express')
const router = express.Router();
const db = require('../../db/index');

const homeimg = require('../handle/assets_homeimg')

router.get('/homeimg',homeimg.getHomeimg)

// 主页照片和连接
module.exports = router


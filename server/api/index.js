const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/spotify', require('./spotify'))
router.use('/lyrics', require('./lyrics'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

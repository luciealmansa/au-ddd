const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')

const app = express()

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)

const port = 3000

app.listen(port, () => {
  console.log('Server is listenning on port ' + port)
})

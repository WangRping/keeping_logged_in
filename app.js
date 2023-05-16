const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const generateSessionId = require('./models/generate_session_id')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]
const loggedInUser = {}

app.get('/', (req, res) => {
  const sessionId = req.cookies.sessionId
  if (sessionId && loggedInUser[sessionId]) {
    res.redirect('/profile')
  } else {
    res.render('index')
  }
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const filteruser = users.filter(user => {
    return user.email === email && user.password === password
  })

  if (filteruser.length === 1) {
    const sessionId = generateSessionId()
    loggedInUser[sessionId] = filteruser[0]
    res.cookie('sessionId', sessionId, { httpOnly: true })
    res.redirect('/profile')
  } else if (filteruser.length > 1) {
    console.log(`發生例外狀況,篩選到多個使用者,應進行UsersData偵錯`)
  } else {
    const loingError = true
    res.render('index', { loingError })
  }
})

app.get('/profile', (req, res) => {
  const sessionId = req.cookies.sessionId
  if (sessionId && loggedInUser[sessionId]) {
    res.render('profile', { loggedInUser: loggedInUser[sessionId] })
  } else {
    res.redirect('/')
  }
})

app.get('/logout', (req, res) => {
  const sessionId = req.cookies.sessionId
  delete loggedInUser[sessionId]

  res.clearCookie('sessionId')
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
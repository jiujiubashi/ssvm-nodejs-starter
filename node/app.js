const { computeWithJS, computeWithWasm } = require('./compute')
const express = require('express')

const hostname = '0.0.0.0';
const port = 3000;

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.post('/solve', (req, res) => {
  let engine = req.body["engine-select"]
  let mode = req.body["mode-select"]
  let maxNumber = req.body["max-number"]
  let answer
  let startTick = new Date()
  if (engine === "javascript") {
    answer = computeWithJS(mode, maxNumber)
  } else if (engine === "wasm") {
    answer = computeWithWasm(mode, maxNumber)
  }
  let endTick = new Date()
  res.json({
    answer,
    time: endTick - startTick
  })
})

app.post('/test', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})
app.listen(port, () => console.log(`Listening at http://${hostname}:${port} 🎊`))

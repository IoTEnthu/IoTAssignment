const express = require('express')
const ObjectsToCsv = require('objects-to-csv')
const bodyParser = require('body-parser')
const https = require('https')
const { promisify } = require('util')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.json())
let sheet


app.get('/', function (req, res) {
  res.send(
    "<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>",
  )
})
app.post('/topic', function (req, res) {
  console.log(req.body)
  const fileData = req.body
  const fileDataArray = [fileData]
  console.log(fileDataArray)
  const csv = new ObjectsToCsv(fileDataArray)

  // async function addNewRow() {
  //   const larryRow = await sheet.addRow({ timestamp: ts, value: value, sensor: sensor })
  // }

  csv
    .toDisk('./public/data.csv', { append: true })
    .then(() => {
      res.json({ status: 200 })
    })

    .catch(() => {
      res.json({ status: 500 })
    })
})
app.post('/buffer', function (req, res) {
  console.log(req.body)

  const buffer = req.body
  const csv = new ObjectsToCsv(buffer)
  csv
    .toDisk('./public/data.csv', { append: true })
    .then(() => {
      res.json({ status: 200 })
    })

    .catch(() => {
      res.json({ status: 500 })
    })
})
app.listen(process.env.PORT || 3002, function () {
  console.log('server started at port 3002')
})

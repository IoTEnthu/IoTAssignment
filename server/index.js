const express = require('express')

const bodyParser = require('body-parser')
const https = require('https')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('./premium-episode-316818-fb0042dafdc4.json')
const { promisify } = require('util')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('assets'))
app.use(bodyParser.json())
let sheet

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet('1alQLfMZQ5Lpwi93bzpKfujDNTwaVkTlnn14MhzpCaoU')
  await doc.useServiceAccountAuth(creds)

  await doc.loadInfo() // loads document properties and worksheets

  console.log(doc.title)
  sheet = doc.sheetsByIndex[0]

  // append rows
  // const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' })
  // const moreRows = await sheet.addRows([
  //   { name: 'Sergey Brin', email: 'sergey@google.com' },
  //   { name: 'Eric Schmidt', email: 'eric@google.com' },
  // ])

  // const rows = await promisify(sheet.getRows)({
  //     offset:1
  // })
  // console.log(rows);
}

accessSpreadsheet()

app.get('/', function (req, res) {
  res.render('index', { name: list })
})
app.post('/topic', function (req, res) {
  console.log(req.body)
  const { timestamp, value, sensor } = req.body

  async function addNewRow() {
    const larryRow = await sheet.addRow({ timestamp: timestamp, value: value, sensor: sensor })
  }
  addNewRow()
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
  async function addNewRows() {
    const larryRow = await sheet.addRows(buffer)
  }
  addNewRows()
    .then(() => {
      res.json({ status: 200 })
    })

    .catch(() => {
      res.json({ status: 500 })
    })
})
app.listen(process.env.PORT || 3002, function () {
  console.log('server started at port 3001')
})

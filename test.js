const spawn = require('child_process').spawn
var process = spawn('python', [
  './recommendation/main.py',
  'apoorv',
  'dell laptop'
])

// Takes stdout data from script which executed
// with arguments and send this data to res object
process.stdout.on('data', function(data) {
  const parsedData = JSON.parse(data.toString('utf8')).product
  const productNames = []
  for (var key in parsedData) {
    productNames.push(parsedData[key])
  }
  console.log(productNames)
})

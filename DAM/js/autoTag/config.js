require('dotenv').config();

var args = require('args');

args
  .option('key', 'Your API Key', process.env.API_KEY)
  .option('secret', 'Your API Secret', process.env.API_SECRET)
  .option('port', 'Port to listen on', 3000)

module.exports = args.parse(process.argv);
const config = require('./config');

if (!config.key || !config.secret) {
  console.warn("Must define both API key and API secret, either in .env file or via command line flags");
  var args = require('args');
  args.showHelp();
}

var request = require('request')
  , queryString = require('query-string')
  , Promise = require('promise')
  , baseUrl = 'https://api.imagga.com/v2/';

var makeRequest = function (method, path, data) {
  method = method.toLowerCase();
  let url = baseUrl + path;
  if (method == 'get' && data) {
    url += '?' + queryString.stringify(data);
  }
  return new Promise(function (resolve, reject) {
    let handler = function (error, response, body) {
      if (error) {
        reject(error);
        return;
      }
      let data = JSON.parse(body)
        , status = data.status;
      if (status.type == 'success') {
        resolve(data.result, data.status, response);
      } else {
        reject(data, response);
      }
    }
    let args = [url, data, handler];
    if (method == 'get') {
      args.splice(1, 1); // remove data, not needed
    } else if (method == 'upload') {
      args = [{
        url: url,
        formData: data
      }, handler]
      method = 'post'
    }
    request[method].apply(request, args).auth(config.key, config.secret, true);
  })
}

module.exports = {
  request: makeRequest,
  get: function (url, data) {
    return makeRequest('get', url, data);
  },
  post: function (url, data) {
    return makeRequest('post', url, data);
  },
  put: function (url, data) {
    return makeRequest('put', url, data);
  },
  upload: function (url, buffer) {
    return makeRequest('upload', url, buffer)
  }
}
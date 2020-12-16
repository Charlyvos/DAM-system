let ar = require('./api-request')
  , Promise = require('promise');

module.exports = {
  tags: function (data) {
    return new Promise(function (resolve, reject) {
      // If sending actual image body, use POST (with upload syntax sugar)
      // otherwise GET
      let method = data.image ? 'upload' : 'get';
      ar[method]('tags', data)
        .then(
          function (data, status, response) {
            resolve(data.tags);
          },
          reject // can just pass this directly along
        );
    })
  },
  upload: function (img) {
    return new Promise(function (resolve, reject) {
      ar
        .upload('uploads', {
          image: img
        })
        .then(
          function (data, status) {
            resolve(data);
          },
          reject
        )
    })
  }
}
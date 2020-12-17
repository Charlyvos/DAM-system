// const http = require('http');
// const express = require('express');
// const path = require('path');

// const app = express();
// app.use(express.json());
// app.use(express.static("DAM"));

// app.use('/', (req, res) => res.sendFile(path.join(__dirname+'/DAM/index.html')));

// const server = http.createServer(app);
// const port = 3000;
// server.listen(port);

// console.log(`Server listening on port: ${port}`);

var http = require('http')
  , url = require('url')
  , qs = require('query-string')
  , Router = require('router')
  , serveStatic = require('serve-static')
  , finalhandler = require('finalhandler')
  , fileUpload = require('express-fileupload')
  , config = require('./DAM/js/autoTag/config')
  , api = require('./DAM/js/autoTag/api');

var router = new Router()
  , apiRouter = new Router()
  , files = serveStatic('DAM')
  , port = config.port;

router.use(files)
router.use(fileUpload())
router.use('/api/', apiRouter)

apiRouter.get('/tags/:id', function (req, res) {
  var upload_id = req.params.id;
  api
    .tags({image_upload_id: upload_id})
    .then(
      function (tags) {
        let data = {
          upload_id: upload_id,
          tags: tags
        }
        res.writeHead(200, {'Content-type': 'text/javascript'});
        res.write(JSON.stringify(data));
        res.end();
      },
      function (err) {
        console.warn('Error getting tags', err);
        res.writeHead(500, {'Content-type': 'text/javascript'});
        res.write(JSON.stringify(err));
        res.end();
      }
    );
})

apiRouter.get('/tags', function (req, res) {
  var requestUrl = url.parse(req.url)
    , queryString = requestUrl.query
    , query = qs.parse(queryString)
    , image = query.image || defaultImage;
  api
    .tags({image_url: image})
    .then(
      function (tags) {
        let data = {
          image: image,
          tags: tags
        }
        res.writeHead(200, {'Content-type': 'text/javascript'});
        res.write(JSON.stringify(data));
        res.end();
      },
      function (err) {
        console.warn('Error getting tags', err);
        res.writeHead(500, {'Content-type': 'text/javascript'});
        res.write(JSON.stringify(err));
        res.end();
      }
    );
})

apiRouter.post('/tag', function (req, res) {
  let image = req.files.image;
  if (!image) {
    res.writeHead(300, {'Content-type': 'text/javascript'})
    res.end(JSON.stringify({'status': 'failed', 'error': 'no image specified'}))
    return
  }

  api
    .tags({
      image: image.data // Pass pure image buffer to API
    })
    .then(
      function (tags) {
        let data = {
          tags: tags
        }
        res.writeHead(200, {'Content-type': 'text/javascript'});
        res.write(JSON.stringify(data));
        res.end();
      },
      function (err) {
        console.warn('Error getting tags', err);
        res.writeHead(500, {'Content-type': 'text/javascript'});
        res.write(JSON.stringify(err));
        res.end();
      }
    );
})

console.log('Listening at http://localhost:' + port);

http.createServer(function (req, res) {
  router(req, res, finalhandler(req, res))
}).listen(port)
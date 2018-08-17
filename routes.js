const routes = module.exports = require('next-routes')();

routes
.add('index')
.add('channel', '/:slug.:id', 'channel')
.add('podcast', ':slugChannel.:idChannel/:slug.:id', 'channel')
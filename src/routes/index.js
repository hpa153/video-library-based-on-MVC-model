const videoRouter = require('./video');
const sitesRouter = require('./sites');
const manageRouter = require('./manage');

function route(app) {
  app.use('/manage', manageRouter);
  app.use('/videos', videoRouter);
  app.use('/', sitesRouter);
}

module.exports = route;

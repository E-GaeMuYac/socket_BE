const http = require('./app');
const logger = require('../logger/logger');

require('./socket');

http.listen(3000, () => {
  logger.log(`Listening on http://localhost:3000`);
});

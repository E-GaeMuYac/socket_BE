const http = require('./app');

require('./socket');

http.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});

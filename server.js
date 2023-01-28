const http = require('./app');
require('./socket');

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);

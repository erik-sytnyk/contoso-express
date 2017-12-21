process.on('uncaughtException', err => {
  let stack = err.stack;
  console.log(`Uncaught exception. ${err}`);
});

import server from './server';
import config from './config';
import logger from './logger';

async function start() {
  let port = await server.start(process.env.PORT || config.app.port);

  console.log(`Server is listening on port ${port}!`);

  logger.info(`Server started.`);
}

start();

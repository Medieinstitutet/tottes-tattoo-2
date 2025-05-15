import app from './app.mjs';
import config from './config/config.mjs';

app.listen(config.port, () => {
  console.log(
    `Server is running at http://localhost:${config.port} in ${config.nodeEnv} mode`
  );
});

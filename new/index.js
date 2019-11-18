const Client = require('ssh2-sftp-client');

const ftpConfig = {
  host: process.env.FTP_HOST || "localhost",
  port: parseInt(process.env.FTP_PORT || "22"),
  username: process.env.FTP_USERNAME || "foo",
  password: process.env.FTP_PASSWORD || "pass",
  hostKeyAlgorithm: process.env.FTP_HOST_KEY_ALGORITHM,
  basePath: process.env.FTP_BASE_PATH || "/",
  debug: (process.env.DEBUG_LOG || "false") == "true",
  count: parseInt(process.env.COUNT || "10")
}

const logger = console;

async function tryConnect() {
  const results = {
    success: 0,
    failure: 0,
  }

  const sftpClient = new Client()

  for (index = 0; index < ftpConfig.count; index++) {
    try {
      await sftpClient.connect({ ...ftpConfig, ...(ftpConfig.debug? { debug: logger.error } : {}) });
      await sftpClient.list('/')
      results.success++
    } catch (e) {
      logger.error("[SFTP-DEBUG-LIBRARY]: caught an error trying to connect:", e)
    }

    await sftpClient.end()
  }

  return { ...results, failure: ftpConfig.count - results.success }
}

tryConnect().then(results => {
  logger.info(results);
}).catch(e => {
  logger.error(e)
})
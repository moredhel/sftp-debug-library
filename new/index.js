var Client = require('ssh2-sftp-client');

const host = process.env.FTP_HOST || "localhost";
const port = Number(process.env.FTP_PORT || "22");
const username = process.env.FTP_USERNAME || "foo";
const password = process.env.FTP_PASSWORD || "pass";
const hostKeyAlgorithm = process.env.FTP_HOST_KEY_ALGORITHM;
const basePath = process.env.FTP_BASE_PATH || "/";


// initial config
var ftpConfig = {
  host,
  port,
  username,
  basePath,
  password,
  // debug: console.info,
  // algorithms: {
  //   key: [
  //     "diffie-hellman-group1-sha1",
  //   ],
  //   cipher: [
  //     "blowfish-cbc",
  //     "3des-cbc"
  //   ],
  //   compress: [
  //     "zlib"
  //   ],
  //   hmac: [
  //     "hmac-sha1",
  //     "hmac-md5"
  //   ]
  // }
};

// try connect N times & count the failures. & print out the config
function try_connect(config, count) {
  var results = {
    "success": 0,
    "failure": 0,
  }
  var promise = Promise.resolve(results)
  console.log(config)
  return do_try_connect(promise, config, count)
}

var br = false;
function do_try_connect(promise, config, count) {
  if (count <= 0 || br) {
    return promise.then((results) => {
      results["config"] = config
    })
  }

  // return
  promise.then((results) => {
	let sftp = new Client()
    return sftp.connect(ftpConfig).then(() => {
      return sftp.list('/');
    }).then(data => {
      console.log("success")
    }).catch(err => {
	  console.log(err)
      console.log("failure")
    }).then(() => sftp.end())
  })

  return do_try_connect(promise, config, count-1)
}

try_connect(ftpConfig, 10).then(data => console.log(data))

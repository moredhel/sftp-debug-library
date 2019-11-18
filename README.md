This repo is built to test out what is going on with the ssh2-sftp node library.

There seem to be some issues with connecting to services which I am struggling to pin down.


This repo does a number of things:

1. setup a simple sftp service
2. run the latest version of the library against the sftp server
3. run an older version of the library against the sftp server

## Usage

To run the older version:

``` shell
# from root of project
cd ./old && npm i
make old
```

To run the newer version:

``` shell
# from root of project
cd ./new && npm i
make new
```

both of these will check to see if the sftp server is up and running, and if not start it up before executing the node.


## Future

1. figure out if there are any configuration values required to get it running against our prod instances.

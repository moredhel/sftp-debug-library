#!/usr/bin/env bash

function start_sftp {
  docker run --rm -it -p 22:22 -d --name=sftp atmoz/sftp foo:pass:::upload
  sleep 3 # give it time to get ready
}

if docker inspect sftp &> /dev/null; then
	true
else
	start_sftp
fi

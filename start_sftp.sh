#!/usr/bin/env bash


docker run -it -p 22:22 -d atmoz/sftp foo:pass:::upload

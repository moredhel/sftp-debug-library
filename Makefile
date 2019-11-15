.PHONY: start-sftp
start-sftp:
	bash start_sftp.sh

.PHONY: old
old: start-sftp
	node old/index.js

.PHONY: new
new: start-sftp
	node new/index.js

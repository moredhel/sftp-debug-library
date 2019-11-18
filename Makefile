.PHONY: start-sftp
start-sftp:
	bash start_sftp.sh

.PHONY: old
old: start-sftp
	cp new/index.js old/index.js
	cd old && node index.js

.PHONY: new
new: start-sftp
	cd new && node index.js

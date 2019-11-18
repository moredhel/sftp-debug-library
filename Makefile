.PHONY: start-sftp
start-sftp:
	bash start_sftp.sh

.PHONY: old
old: start-sftp
	cp new/index.js old/index.js
	cd old && npm start

.PHONY: new
new: start-sftp
	cd new && npm start

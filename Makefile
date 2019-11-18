.PHONY: start-sftp
start-sftp:
	bash start_sftp.sh

.PHONY: deps
deps:
	cd new && npm i --ci
	cd old && npm i --ci

.PHONY: old
old: start-sftp old-no-docker

old-no-docker:
	echo "starting old"
	cp new/index.js old/index.js

	cd old && npm start | tee old.log

.PHONY: new
new: start-sftp new-no-docker

new-no-docker:
	echo "starting new"
	cd new && npm start | tee new.log

run: old-no-docker new-no-docker
	echo "done, sleeping"
	sleep 1000000

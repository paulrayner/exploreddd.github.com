
build: node_modules
	node index.js

node_modules: package.json
	yarn install

.PHONY: build

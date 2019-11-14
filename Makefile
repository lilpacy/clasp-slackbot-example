setup:
	mv _env .env && \
	npm i && \
	clasp create --rootDir src
build:
	npm run build
deploy:
	npm run deploy
watch:
	npm run watch

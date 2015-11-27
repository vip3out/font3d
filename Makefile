build:
	./node_modules/.bin/gulp

init:
	npm install
	which sass || gem install sass

clean:
	./node_modules/.bin/gulp clean

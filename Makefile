test:
	TESTBUILD=true npx webpack --config webpack.config.js
	npx karma start karma.conf.js

clean:
	rm -fr test-dist/

build:
	npx webpack --config webpack.config.js

watch:
	npx webpack --config webpack.config --watch
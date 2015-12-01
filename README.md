[![Build Status](https://travis-ci.org/r-park/todo-react.svg?branch=master)](https://travis-ci.org/r-park/todo-react)


# Todo app with React and Firebase
A simple Todo app example using React, Redux, and Firebase with OAuth authentication. Try the demo at <a href="https://todo-react.firebaseapp.com" target="_blank">todo-react.firebaseapp.com</a>.

- React `~0.14.3`
- React-Router `1.0.0`
- Babel
- ES6
- Firebase w/ OAuth
- Gulp `4.0.0-alpha.2`
- Immutable
- SASS
- Webpack
- Webpack Dev Server


## Installing dependencies
```bash
npm install
```


#### Gulp v4 (optional)
```bash
npm install -g gulpjs/gulp-cli#4.0
```
The gulp tasks for this project require gulp v4-alpha. If you don't wish to globally install the v4 gulp-cli, you can run the gulp tasks using the locally installed gulp under `./node_modules/.bin` — for example:
```bash
./node_modules/.bin/gulp run
```


## Developing
```bash
gulp
```
Executing the default `gulp` command will:
- Build the project
- Start the server at <a href="http://localhost:3000" target="_blank">localhost:3000</a>
- Watch for changes to the source files and process changes
- Live-reload the browser


## Testing
```bash
gulp test.watch
```
Executing `gulp test.watch` will:
- Run the test suites
- Watch for changes to the source files
- Re-run the tests whenever the sources are modified

For a single test run without auto-watch, execute `gulp test` instead.

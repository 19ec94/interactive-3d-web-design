# `i3wd` frontend 
This repository contains source code to power the frontend of `i3wd` web
application. The source code for `i3wd` backend can be found in the [this repository](https://github.com/19ec94/interactive-3d-web-design-backend).

## Required software
`node` environment is required to run this server. 

## Download and Install software dependencies
- To get this repository on your system, run
```bash
https://github.com/19ec94/interactive-3d-web-design.git
```
in your terminal.

- Make sure you are in the project root directory. If not, execute
```bash
cd <PATH_TO_DIR>
```
in your terminal. Replace `<PATH_TO_DIR>` with appropriate path name.
- To install the software dependencies, run
```bash
npm install
```
in the project root directory.

## How to run the server?
- To start the react application server, run
```bash
npm run start
```

## Proxy to backend server
Note that this application is configured to connect to `http://localhost:5000`
in package.json.

## API endpoints
- /about
- /login
- /signup
- /reset
- /dashboard
- /levels
- /scoreboard


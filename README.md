# FPTUCF Frontend
This project is written by ReactJS, Redux

## Development
0. Install NodeJS, npm
1. Clone source code
2. Go to project folder
3. Type 'npm install'
4. Type 'npm run start'

## Deployment
0. Install NodeJS, npm
1. Clone source code
2. Go to project folder
3. Type 'npm install'
4. Type 'npm run start:prod'
5. Install Nginx and config reverse proxy to port 3301 (current port, you can change it in server/index.js)

## Convention
1. Naming Conventions
	- api services: api[Entity]_[methodName]
	- action types: [MODULE]__[DISPATCH_TYPE]
	- action creators: [module]_[dispatchAction]

2. APIs flow:
	1. Call api service from Container (Component)
	2. Dispatch action after api resolve, reject
	3. Subscribe reducer
# console-api

## Running
1. Varify that node.js/npm is installed (Find the install for node.js/npm here: https://nodejs.org/en/)
```
node -v
npm -v
```

2. Set the required node version. Our build requires node version v10.\*.\*
```
nvm use v10.20.1
```

3. The following environment variables must be set.
```
API_SERVER_URL
SERVICEACCT_TOKEN - the token that you can get from the top right corner of the console page - configure client - the value of kubectl config set-credentials admin --token, it's a long string, starts with "ey...". Please note that this value is updated every 24 hrs.
```

4. Start the dev server
```
npm i
npm start
```

5. Start the production server
```
npm i
npm run build
npm run start:production
```

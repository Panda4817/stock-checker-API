# [Stock Price Checker](https://freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker)
[![Run on Repl.it](https://repl.it/badge/github/panda4817/stock-price-checker)](https://repl.it/@Panda4817/stock-price-checker)

A freecodecamp project for the information security certificate. A stock checker API implementation using NodeJS, ExpressJS server and MongoDB database for checking ip address against stock symbols. I have also added a frontend to test out API responses and wrote all 5 functional tests using Chai and Mocha. I have set the content security policies to only allow loading of scripts and CSS from my server and trusted servers using helmet.

## Usage on local machine

- Add `NODE_ENV=test` to `.env`
- Add `DB=<your database connection variable>` to `.env`
- Add `PORT=8080` to `.env`
- run `npm install && npm start` to run all 5 functional tests and start node server
- Open `localhost:8080` on browser to see frontend
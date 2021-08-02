# Downtime Monitoring System

Deployed at - [https://downtime-monitor.web.app/](https://downtime-monitor.web.app/)

## Screenshots
![home-page](https://github.com/shamoilarsi/downtime-monitor/blob/master/readme/s1.png)
![details-page](https://github.com/shamoilarsi/downtime-monitor/blob/master/readme/s2.png)

## Available Scripts

In the project directory, you can run:

`yarn`

to install all dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Important Information

- in `utilities/axios.js`, the `baseURL` for backend API can be changed.

- The backend is deployed on Heroku which in the free tier does not work as expected with cron jobs. I request you to please run the project locally and test the cron job along with other API end-points.

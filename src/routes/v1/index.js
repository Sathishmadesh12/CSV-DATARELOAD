const express = require('express');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const cityRoute = require('./city.route');
const countryRoute = require('./country.routes');
const universityRoute = require('./university.routes');
const courseRoute = require('./course.route');
// const country2Route = require

const router = express.Router();

const defaultRoutes = [
  {
    path: '/city',
    route: cityRoute,
  },
  {
    path: '/country',
    route: countryRoute,
  },
  {
    path: '/university',
    route: universityRoute,
  },
  {
    path: '/course',
    route: courseRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

var APP_URL = 'https://zerrvgbupmfsfbj.form.io';
var API_URL = 'https://api.form.io';

// Parse query string
var query = {};
location.search.replace(/^[^a-z]+/, '').split("&").forEach(function(item) {
    query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});

var appUrl = query.appUrl || APP_URL;
var apiUrl = query.apiUrl || API_URL;
angular.module('formioAppTodo').constant('AppConfig', {
  appUrl: appUrl,
  apiUrl: apiUrl,
  forms: {
    userForm: appUrl + '/user',
    userLoginForm: appUrl + '/user/login',
    userRegisterForm: appUrl + '/user/register',
    trailForm: appUrl + '/trail'
  }
});

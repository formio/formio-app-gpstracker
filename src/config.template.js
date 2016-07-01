{% if domain %}
APP_URL = '{{ domain }}';
API_URL = '{{ domain }}';
{% else %}
APP_URL = '{{ protocol }}://{{ path }}.{{ host }}';
API_URL = '{{ protocol }}://api.{{ host }}';
{% endif %}

// Parse query string
var query = {};
location.search.substr(1).split("&").forEach(function(item) {
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

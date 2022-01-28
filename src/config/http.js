export const allowedMethods = [ 'HEAD', 'GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS' ];

export const headers = {
    'Content-Type'    : 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'charset': 'utf-8'
};

export const timeoutSec = 30;

export const apiUrl = 'https://www.zbdigital.net/apiservice/api';

export const formDataHeaders = {
    'Content-Type'    : 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    'charset': 'utf-8'
};
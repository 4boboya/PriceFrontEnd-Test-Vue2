import { $priceCenterSite } from './html';
export const Login = async function (loginData) {   // login.vue (Done)
    const loginResult = await $priceCenterSite('POST', '/auth/login', { body: loginData });
    return loginResult;
}
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {logout as apiLogout } from './api/data.js';
import { getUserData } from './utility.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/createaCarListing.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myListingsPage } from './views/myListings.js';
import { registerPage } from './views/register.js';

const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
userNav();


page('/', decorateContent, homePage);
page('/register', decorateContent, registerPage);
page('/login', decorateContent, loginPage);
page('/catalog', decorateContent, catalogPage);
page('/create', decorateContent, createPage);
page('/details/:id', decorateContent, detailsPage);
page('/edit/:id', decorateContent, editPage);
page('/myListings', decorateContent, myListingsPage);


page.start();



function decorateContent(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.userNav = userNav;
    ctx.user = getUserData();
    next();
}


function userNav() {
    const user = getUserData();
    if (user) {
        document.getElementById('profile').style.display = '';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-user').textContent = `Welcome ${user.username}` ;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}

async function logout() {
    apiLogout();
    userNav();
    page.redirect('/');
}
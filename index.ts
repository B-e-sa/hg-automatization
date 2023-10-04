import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import sleep from './utils/sleep';

dotenv.config();

(async () => {
    const browser = await puppeteer.launch();
    const webpage = await browser.newPage();

    // GO TO HS LOGIN PAGE
    await webpage.goto(String(process.env.HG_URL));

    // ACCEPT COOKIES BUTTON
    await webpage.click('.khPLua');

    // FILLING CREDENTIALS
    await webpage.type('#email', String(process.env.USER_EMAIL));
    await webpage.type('#password', String(process.env.USER_PASSWORD));

    // LOGIN
    await webpage.click('.hg-login-with-email')

    // AWAIT PAGE LOAD
    await sleep(10000);

    // CLOSE BROWSER
    await browser.close();
})();
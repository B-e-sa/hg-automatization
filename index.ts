import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
    try {
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
        await webpage.click('.hg-login-with-email');

        // AWAIT PAGE LOAD
        await webpage.waitForSelector(
            // TODO: change to a real selector
            'UNDEFINED', 
            { timeout: 5000 },
        );

        // CLOSE BROWSER
        await browser.close();
    } catch (e) {
        throw new Error(e);
    }
})();
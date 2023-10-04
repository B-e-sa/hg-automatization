import puppeteer from 'puppeteer';

(async() => {
    const browser = await puppeteer.launch();

    const webpage = await browser.newPage();

    await webpage.goto('https://dashboard.honeygain.com/login');

    await webpage.click('.khPLua');

    await webpage.type('#email', process.env.USER_EMAIL as string);
    await webpage.type('#password', process.env.USER_PASSWORD as string);

    await webpage.screenshot({
        path: './temp/screenshot.png',
    });

    await browser.close();
})();
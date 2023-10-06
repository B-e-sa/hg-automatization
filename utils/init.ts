import puppeteer from "puppeteer";
import sleep from "./sleep";

const init = async () => {
    try {
        // GO TO HS LOGIN PAGE
        const browser = await puppeteer.launch();
        const webpage = await browser.newPage();
        await webpage.goto(String(process.env.HG_URL));

        // ACCEPT COOKIES BUTTON
        await webpage.click('.khPLua');

        // FILLING CREDENTIALS
        await webpage.type('#email', String(process.env.USER_EMAIL));
        await webpage.type('#password', String(process.env.USER_PASSWORD));

        // LOGIN
        await webpage.click('.hg-login-with-email');

        // AWAIT PAGE LOAD
        await webpage.waitForXPath(
            '//span[contains(text(), "Current balance")]',
            { timeout: 10000 },
        );

        // CLICK TO OPEN DAILY LUCKY POT
        await webpage.click('//span[contains(text(), "Open Lucky Pot")]')
            .catch(async e => {

                // IF THE OPEN BUTTON DOESN'T EXISTS, AWAIT THE SPECIFIED TIME
                if (e.name === 'DOMException') {
                    const hoursMinutesSecondsSpans = await webpage.$$eval(
                        'div[days] span',
                        elements => elements.map(element => element.innerHTML),
                    );

                    const [hours,, minutes,, seconds] = hoursMinutesSecondsSpans;

                    const hourToMs = Number(hours) * 3.6e+6;
                    const minutesToMs = Number(minutes) * 6000;
                    const secondsToMs = Number(seconds) * 1000;

                    const totalSleepHours = hourToMs + minutesToMs + secondsToMs;

                    sleep(totalSleepHours + 10000);
                }
            });

        // CLOSE BROWSER
        await browser.close();
    } catch (e: any) {
        throw new Error(e);
    }
}

export default init;
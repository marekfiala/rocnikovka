const puppeteer = require("puppeteer");
const Match = require("../models/match")
const chalk = require("chalk")

const scrapeProduct = async (urls) => {
  const browser = await puppeteer.launch();
  if (urls === undefined || urls.length === 0 || urls === "") return
  if (typeof urls === "string" || urls instanceof String) urls = [urls];

  for (let url of urls) {
    if (!url.startsWith("http"))
      url = `https://www.livesport.cz/zapas/${url}/#/prehled-zapasu/prehled-zapasu`;
    console.log(url);
    const page = await browser.newPage();
    await page.goto(url);

    // minutes
    const actions = await page.$$(".smv__incident");
    const scores = [];
    for (const el of actions) {
      const minute = await (
        await el.$$eval("div", (nodes) => nodes.map((n) => n.innerText))
      ).slice(0, 2);
      if (minute[1] == "") continue;
      minute[1] = minute[1]?.split(" - ")
      scores.push({minutes: minute[0] || "0", score: minute[1] || ["0", "0"]})
    }
    console.log(scores);

    // timestamp
    const [el] = await page.$x("/html/body/div[1]/div/div[4]/div[1]/div");
    const txt = await el.getProperty("textContent");
    const timestamp = await txt.jsonValue();
    console.log(timestamp);

    // teams - participants
    const participants = await page.$$(
      ".participant__participantName .participant__overflow"
    );
    const participantsArr = [];
    for (const el of participants) {
      const txt = await el.getProperty("textContent");
      const rawTxt = await txt.jsonValue();
      const teamCountry = rawTxt.split(" (")
      teamCountry[1] = teamCountry[1]?.slice(0, -1)
      participantsArr.push({name: teamCountry[0] || "N/A", country: teamCountry[1] || "N/A"})
    }
    console.log(participantsArr)

    page.close();
    if (url == url[-1]) browser.close();
    const urlID = url.split("/")[4];
  
    // continue;
    try {
      const match = new Match({
        participants: participantsArr,
        timestamp,
        scores,
        urlID
      });
      const result = await match.save();
      console.log(`${Object.keys(result).length} records inserted.`)
      
    } catch (error) {
      console.log(error);
    }

  }

  console.log(chalk.yellow.bold('All records inserted'));
};

module.exports = scrapeProduct;

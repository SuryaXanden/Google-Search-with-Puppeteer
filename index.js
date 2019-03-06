const puppeteer = require('puppeteer');
let main = async (item) =>
{
    try 
    {
        const browser = await puppeteer.launch({headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');

        let url = 'https://www.google.com/search?q=~intitle:' + item;
        await page.goto(url, {waitUntil: 'domcontentloaded'});
        
        try
        {
            const entity_name = await page.$eval('#rhs_block > div > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > span', el => el.innerText);
        }
        catch(e)
        {
            console.error(e)
        }
        
        try
        {
            const entity_desc = await page.$eval('#rhs_block > div > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(2) > span', el => el.innerText);
        }
        catch(e)
        {
            console.error(e)            
        }
        
        
        //&google_abuse=GOOGLE_ABUSE_EXEMPTION%3DID%3Dd58e0ebd986a1259:TM%3D1551868211:C%3Dr:IP%3D106.51.65.119-:S%3DAPGng0sq2C-S68FOnvD0uoEi3UY1Gl4k3g%3B+path%3D/%3B+domain%3Dgoogle.com%3B+expires%3DWed,+06-Mar-2019+13:30:11+GMT

        browser.close();
        let data = {
                        "name" : entity_name || ( "\"" + item + "\"" ),
                        "desc" : entity_desc || "Other"
                    };
        console.log(JSON.stringify(data));
    }
    catch(e)
    {
        console.error(e)
    }
};

main("Github");
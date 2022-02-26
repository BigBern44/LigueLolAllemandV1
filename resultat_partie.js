
const mysql = require("mysql2/promise");
const puppeteer = require('puppeteer');
(async () => 
{
	let Pseudo="HydraWasTaken"
	let ConfigB="INSERT INTO Site (Pseudo,Result) VALUES ('"+Pseudo+"','3')"
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(`https://lolprofile.net/fr/summoner/euw/${Pseudo}#update`);
	browser.close();
	const last_game = await page.evaluate(() => 
	{
		var res1 = document.querySelector('#main > div.s-c.cf.tab1 > div.s-cm > div > div.matches > div:nth-child(1) ');
		return res1.childNodes[1].className
	});
	const connection = await mysql.createConnection({
        host:"sql11.freesqldatabase.com",
        user:"sql11475460",
        password:"XfwJP8N9CZ",
        database:"sql11475460",
        port:"3306",
        
    })
	try
		{
			await connection.query(
				ConfigB
			)
		}
		catch(e)
		{
			console.log(e)
		}
		
	

	if(last_game=="s-m-t defeat-bg1 cf")
	{
		try
		{
			await connection.query(
				"UPDATE Site SET Result=1 Where Pseudo='"+Pseudo+"'"
			)
			console.log("inserted")
		}
		catch(e)
		{
			console.log(e)
		}
		console.log("defaite");
	}
	else if(last_game=="s-m-t victory-bg1 cf")
	{
		console.log("victoire");
		try
		{
			await connection.query(
				"UPDATE Site SET Result=2 Where Pseudo='"+Pseudo+"'"
			)
			console.log("inserted")
		}
		catch(e)
		{
			console.log(e)
		}
	}
	else
	{
		console.log("remake");
		try
		{
			await connection.query(
				"UPDATE Site SET Result=1 Where Pseudo='"+Pseudo+"'"
			)
			console.log("inserted")
		}
		catch(e)
		{
			console.log(e)
		}
	}
	browser.close();
})();
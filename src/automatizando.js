const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const config = require('./config');

var text = [];

(async () => {
	const response = await fetch('https://type.fit/api/quotes');
  const json = await response.json();

  console.log(json);
  return text = json;
    
})();

var mensagem = []
setTimeout(() => {
  mensagem = text.map((valor) => valor.text);
},3000)






async function automatiza() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: false
  });

  try { 

  // Inicializa o navegador
  const page = await browser.newPage();
  // O tamanho da tela que sera exibida no navegador
  await page.setViewport({
      width: 1240,
      height: 600
  })
  // Os sites que o navegador deve abrir
  const site = "https://www.facebook.com/";
  const alvo = "https://www.facebook.com/photo.php?fbid=3276575145763796&set=a.343775012377172&type=3&theater";
  
  // Abrindo a primeira pagina
  await page.goto(site);
  // Inserindo valores na página
  await page.waitForSelector('#email');
  await page.type('#email', config.login, {delay: 0});
  await page.type('#pass', config.password, {delay: 0});
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  await page.goto(alvo);
  await page.click('._xlt._418x');

  await page.evaluate(() => {
    document.querySelector("._7791").style.display = 'none';
}).catch(error => { console.log(error) });

  await page.click('._666h._18vj._18vk._42ft'); 

  var cont = 0;
  // var mensagem = [
  //   "Não vai chegar hoje",
  //   "Não vai chegar amanhã",
  //   "Não vai chegar ontem",
  //   "Não vai chegar mesmo não",
  //   "Não vai chegar amanhã tambem",
  //   "Não vai chegar, porque eu não quero",
  //   "Não vai chegar, porque o mazurki não quer",
  //   "Não vai chegar, porque amanhã é outro dia",
  //   "Não vai chegar, mais um dia que se passa, e não chegou",
  //   "Não vai chegar, mais um dia que se passa, e não chega",
  //   "Não vai chegar, talvez chegue hoje",
  // ]

  while (cont <= 20){

    var number = Number((Math.random() * mensagem.length - 1).toFixed());
    var variationTimes = Number((Math.random() * (200 - 100) + 100).toFixed());

    console.log(number);
    console.log(mensagem[number]);
    console.log(variationTimes);

    await page.waitForSelector('._1mf._1mj');
    await page.type('._1mf._1mj', mensagem[number], {delay: variationTimes});
    await page.keyboard.press('Enter');

  cont++;
  }

  setTimeout(async () => {
    await browser.close();
    automatiza();
  }, 1000 * 30)
  
  // Fecha o navegador
  //await browser.close();

  } catch(error) {
    console.error(error)
  }
};

automatiza();
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const config = require('./config');

// Realizando uma consulta na api type.fir
(async () => {
  // Buscando api type.fir
  const response = await fetch('https://type.fit/api/quotes');
  // Transformando a reposta em um json
  const json = await response.json();
  mensagem = json;
  // Pegando apenas o texto da api
  mensagem = mensagem.map((valor) => valor.text);
  return mensagem;
})();

// Criando a função responsável por todo o processo do script
(async function automatiza() {
  // Gera um numero automático de acordo com o tamanho da lista das contas adicionadas
  var sorteioLogin = Number((Math.random() * ((config.length - 1) - 0) + 0).toFixed());
  console.log(sorteioLogin);

  //  Inicia o puppeteer
  const browser = await puppeteer.launch({
    // Escolhe qual navegador sera aberto
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    // Deixa o navegado visível
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
  await page.waitForSelector('#email'); // Espera encontrar o id #email
  // Seleciona o id e adiciona o usuário no input do facebook
  await page.type('#email', config[sorteioLogin].login, {delay: 0});
  console.log(config[sorteioLogin].login);
  // Seleciona o id e adiciona a senha no input do facebook
  await page.type('#pass', config[sorteioLogin].password, {delay: 0});
  console.log(config[sorteioLogin].password);
  // Pressionar enter automaticamente para realizar o login na pagina
  await page.keyboard.press('Enter');
  await page.waitForNavigation(); // Espera a pagina carregar

  await page.goto(alvo); // vai em busca do alvo
  await page.click('._xlt._418x'); // busca pelas classes do html da pagina e da um alto click

  await page.evaluate(() => { // manipula o dom da pagina para ocultar comentários
    document.querySelector("._7791").style.display = 'none';
}).catch(error => { console.log(error) });

  // busca pelas classes do html da pagina e da um alto click
  await page.click('._666h._18vj._18vk._42ft'); 

  // variável para quantidade de comentários
  var cont = 0;
  // Em quanto o cont for menor ou igual a 10 faça

  while (cont <= 10){
    // Cria um numero aleatório para realizar um comentário
    var number = Number((Math.random() * ((mensagem.length - 1) - 0) + 0).toFixed());
    // Cria um numero aleatório para o tempo de digitação
    var variationTimes = Number((Math.random() * (90 - 60) + 60).toFixed());

    console.log(number);
    console.log(mensagem[number]);
    console.log(variationTimes);

    await page.waitForSelector('._1mf._1mj');// busca pelas classes do html
    // Adiciona o comentário no input da pagina
    await page.type('._1mf._1mj', mensagem[number], {delay: variationTimes});
    await page.keyboard.press('Enter'); // auto aperta enter
    
    // incrementa o contador
    cont++;
  }

  // após concluir a digitação fecha o navegador e chama novamente a função
  setTimeout(async () => {
    // fecha o navegador
    await browser.close();
    // chama a função
    automatiza();
  }, 5000)

  } catch(error) { // caso aconteça algum erro fecha o navegador e chama automatiza()
    console.error(error);
    await browser.close();
    automatiza();
  }
})();
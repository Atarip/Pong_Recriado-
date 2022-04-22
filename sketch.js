//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2 ; 

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteWidth = 10;
let raqueteHeight = 90;

//variáveis da raquete oponente

let xRaqueteOponente = 585; 
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo

let meusPontos = 0;
let oponentePontos = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// música: Battle of Pogs. artista: Komiku 
//link da música: https://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/pog

function preload(){
  trilha = loadSound("komikulow.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();

}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentoMinhaRaquete();
  //colisaoRaquete();
  colisaoRaqueteGit(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteGit(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x,y){
  rect (x,y, raqueteWidth, raqueteHeight)
}


function movimentoMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  } 
}

function colisaoRaquete (){
  if (xBolinha - raio < xRaquete + raqueteWidth
     && yBolinha - raio < yRaquete + raqueteHeight
     && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
 
  }
}

function colisaoRaqueteGit(x,y){
  colidiu = 
    collideRectCircle(x, y, raqueteWidth, raqueteHeight, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteHeight / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}



function incluiPlacar(){
  textAlign(CENTER)
  textSize(18)
  fill(color(0,206,209))
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(0,206,209))
  rect(450, 10, 40, 20)
  fill(255)
  text(oponentePontos, 470, 26)
}

function marcaPonto(){
  if (xBolinha + raio > 599){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha - raio < 2){
    oponentePontos += 1;
    ponto.play();
  }
}
const celulas = document.querySelectorAll(".cell"); //selecionando tds as células
const telaResultado = document.querySelector('.resultado')//Layout sem visibilidade que será mostrado ao término da partida
const container = document.querySelector('.container')// Div da tela principal
let jogador = document.querySelector('#jogador')//Layout escondido que será inserido depois com a variável dovencedor
const textoResultado = document.querySelector('.textoResultado')
const btn = document.querySelector('.btn')

  

let vez = true;
let turno = "";
let contadorX = 0;
let contadorO = 0;
let contadorGeral = 0;
let jogadorVencedor = '';

//maneiras de vencer
const maneiras = [[0,1,2], [3,4,5], [6,7,8], //horizontais
                [0,3,6],[1,4,7],[2,5,8], //verticais
                [0,4,8], [2,4,6] ] //diagonais


// definindo os símbolos correspondentes de cada jogador
const jogador_X = "X";
const jogador_O = "O";

//função para retornar o id da célula clicada
function marcarCelula(clique){
    contadorGeral++
    console.log(contadorGeral)
    if(clique.target.matches('.cell')){ //testa se o clique foi onde tem célula
        let cellClicadaId = clique.target.id; //retorna o id
        
        //Identifica qual campo foi clicado
        let indentificador = parseInt(cellClicadaId)//Corrigir Bug que permite clicar duas vezes no campo
        
        console.log(celulas[indentificador])
        celulas[indentificador].classList.add("noClick")//Adiciona a classe css no click, esta possui um desabilitador de clicks
        vezJogador(cellClicadaId);
        
             // adiciona a classe, inverte o turno e define a variável turno como (X ou O) 
    }
    if(contadorGeral == 9 && !checarVencedor()){
        jogadorVencedor = 'empatou'
        mensagem(jogadorVencedor)
    }
    if (contadorX >= 3){ //não dá pra vencer com menos de três jogadas
         //retorna true ou false
         jogadorVencedor = checarVencedor()
         console.log(jogadorVencedor)
         if(checarVencedor() == "X" || checarVencedor() == "O" ){
            mensagem(jogadorVencedor)
         }
    }

    
}

//função para identificar o turno
function vezJogador(cellClicadaId){
    const celula = document.getElementById(cellClicadaId); //pega qual célula foi clicada
    //atribui a string correpondente a vez do jogador
    if(vez == true){ 
        turno = jogador_X; 
        contadorX++;
    }
    else{
        turno = jogador_O;
        contadorO++;

    }

    celula.textContent = turno;
    celula.classList.add(turno); //vai adicionar uma classe correspondente (X ou O) à vez do jogador na célula (pra identificar)
    vez = !vez; //inverte os turnos 

}


//função pra conferir se já existe vencedor 
function checarVencedor(cellClicadaId){
    for (let i = 0; i < 8; i++){
        let combinacao = maneiras[i]; //retorna cada array
        let arrayClasses = []; //lista pra verificação de igualdade
        let elemento = " ";
            for (let j= 0; j < 3; j++){
                elemento = (document.getElementById(combinacao[j])); //pega cada elemento dentro de cada array para logo adicionar
                arrayClasses.push(elemento.className); //adiciona a classe (X ou O) do elemento previamente selecionado
            }   
            
        if (verificarIgualdade(arrayClasses) == true) {
            
            return turno; //break dps
            
        }
    }

    }

function verificarIgualdade(arrayClasses){
    let classe = arrayClasses[0]; 
        if(arrayClasses[1]==classe && arrayClasses[2]==classe && classe !== "cell"){
            a = true
            return true;
        
        }
    
    }

function mensagem(jogadorVencedor){
    const paragrafo = document.getElementById("paragrafo")

    if(jogadorVencedor == "X" || jogadorVencedor == "O" ){
        paragrafo.textContent = `o jogador ${jogadorVencedor} venceu`
        document.getElementById("butao").innerHTML = "<button onclick='resetar()' > RESET </button>"
        telaResultado.classList.add("show")  
        jogador.textContent = jogadorVencedor + " Venceu"
        container.style.display = "none"


    }
    else{
        paragrafo.textContent = `o jogo ${jogadorVencedor}`
        document.getElementById("butao").innerHTML = "<button onclick='resetar()' > RESET </button>"
        telaResultado.classList.add("show")  
        jogador.textContent = "Empatou o jogo"
        container.style.display = "none"
    }

}

function resetar(){
 location.reload()
}

document.addEventListener("click", marcarCelula);



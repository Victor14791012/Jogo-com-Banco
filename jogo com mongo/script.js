let pontos = 0;
let tempo = 0;
let timer = null;




function atualizarTabela(n,p) {
    let saida = document.getElementById('tabela-pontuacoes');
    let tr = document.createElement('tr');
    let nome = document.createElement('td');
    let pontos = document.createElement('td');
  
    nome.textContent = n;
    pontos.textContent = p;
  
    saida.appendChild(tr);
    tr.appendChild(nome);
    tr.appendChild(pontos);

    
}








function iniciaJogo() {
    const numero_moedas = 50;
    const tempo_inicial = 5;

    pontos = 0;
    tempo = tempo_inicial;
    let tela = document.getElementById("tela");
    tela.innerHTML = "";

    for (let i = 0; i < numero_moedas; ++i) {
        let moeda = document.createElement("img");
        moeda.src =
            "https://static.vecteezy.com/system/resources/previews/009/379/340/original/sea-shell-with-pearl-clipart-design-illustration-free-png.png";
        moeda.id = "j" + i;
        moeda.onclick = function () {
            pegaMoeda(this);
        };
        tela.appendChild(moeda);
    }
    timer = setInterval(contaTempo, 1000);

    fetch('http://localhost:5050/score')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição'); 
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const pokemonList = data
      pokemonList.forEach(elem => {
      criarElemento(elem.nome, elem.pontos)
      });
    })
    .catch(error => {
      console.log(error);
    });

}

function pegaMoeda(moeda) {
    moeda.src =
        "https://i.gifer.com/origin/73/73ec412cb51e29f117839d27b78c9ff9_w200.gif";
    ++pontos;
    let contadorPontos = document.getElementById("pontos");
    contadorPontos.innerText = pontos;
}

function contaTempo() {
    if (tempo > 0) {
      --tempo;
      let contadorTempo = document.getElementById("tempo");
      contadorTempo.innerText = tempo + "s";
      return contaTempo = null;
    }
    else if (tempo <= 0) {
      clearInterval(timer);
      let nome = prompt('Parabéns você fez ' + pontos + " pontos! \nInsira seu nome:");
      let pontuacao = {
        name: nome,
        pontos: pontos
      }  
      fetch('http://localhost:5050/score', {
        method: "POST",
        body: JSON.stringify(pontuacao),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error))
  
      console.log(nome, pontos);
  
      atualizarTabela(nome,pontos);
      return ;
    }
  }







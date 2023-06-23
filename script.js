const numero_moedas = 100;
const tempo_inicial = 5;
let pontos = 0;
let tempo = 0;
let timer = null;

function iniciaJogo() {
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
        const jogadores = data;
        jogadores.forEach(jogador => {
            criarElemento(jogador.nome, jogador.pontos);
        });
    })
    .catch(error => {
        console.error(error);
    });

// Restante do código da função iniciaJogo()

// Função para criar elementos de nome e pontos
function criarElemento(nome, pontos) {
    const tabela = document.getElementById('tabela-pontuacoes');
    const linha = document.createElement('tr');
    const colunaNome = document.createElement('td');
    const colunaPontos = document.createElement('td');
    colunaNome.innerText = nome;
    colunaPontos.innerText = pontos;
    linha.appendChild(colunaNome);
    linha.appendChild(colunaPontos);
    tabela.appendChild(linha);
}
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
        contadorTempo.innerText = tempo;
    } else {
        clearInterval(timer);

        // Armazenar pontuação atual no MongoDB
    
    }
}

function removerTudo() {
    fetch('http://localhost:5050/score', { method: 'DELETE' })
        .then(() => {
            console.log('Todas as pontuações foram removidas com sucesso!');
            atualizarTabela();
        })
        .catch(err => {
            console.error(err);
        });
}

function atualizarTabela() {
    fetch('http://localhost:5050/score')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const jogadores = data;
            const tabela = document.getElementById('tabela-pontuacoes');
            tabela.innerHTML = '';
            jogadores.forEach(jogador => {
                const tr = document.createElement('tr');
                const tdNome = document.createElement('td');
                tdNome.innerText = jogador.nome;
                const tdPontuacao = document.createElement('td');
                tdPontuacao.innerText = jogador.pontos;
                tr.appendChild(tdNome);
                tr.appendChild(tdPontuacao);
                const tdAcoes = document.createElement('td');
                const botaoRemover = document.createElement('button');
                botaoRemover.innerText = 'Remover';
                botaoRemover.addEventListener('click', () => {
                    removerPontuacao(jogador._id);
                });
                tdAcoes.appendChild(botaoRemover);
                tr.appendChild(tdAcoes);
                tabela.appendChild(tr);
            });
        })
        .catch(err => {
            console.error(err);
        });
}

function removerPontuacao(id) {
    fetch(`http://localhost:5050/score/${id}`, { method: 'DELETE' })
        .then(() => {
            console.log(`Pontuação com ID ${id} removida com sucesso!`);
            atualizarTabela(); // Atualizar a tabela após remover pontuação
        })
        .catch(err => {
            console.error(err);
        });
}
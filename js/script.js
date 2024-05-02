const btnGerar = document.getElementById('btnGerar');
const personaInput = document.getElementById('persona');
const desejoInput = document.getElementById('desejo');
const txtOutput = document.getElementById('txtoutput');

var opts = {
    lines: 13, // O número de linhas para desenhar
    length: 38, // O comprimento de cada linha
    width: 17, // A largura da linha
    radius: 45, // O raio do círculo interno
    scale: 1, // Fator de escala
    corners: 1, // Arredondamento dos cantos (0..1)
    color: '#b91d32', // Cor da linha #rgb ou #rrggbb ou array de cores
    fadeColor: 'transparent', // Cor do desbotamento das linhas
    speed: 1, // Rounds por segundo
    rotate: 0, // A rotação inicial
    animation: 'spinner-line-fade-quick', // A animação a ser usada
    direction: 1, // 1: horário, -1: anti-horário
    zIndex: 2e9, // O z-index (padrão 2000000000)
    className: 'spinner', // O nome da classe CSS
    top: '50%', // Posição superior relativa ao seu elemento de destino
    left: '50%', // Posição esquerda relativa ao seu elemento de destino
    shadow: '0 0 1px transparent', // Sombra de caixa
    position: 'absolute' // Elemento de posicionamento
};

const apiUrl = 'http://127.0.0.1:5000/generate'; // Substitua com a URL da sua API

// Função para exibir o spinner
function showSpinner() {
    spinner.spin(target);
  }
  
  // Função para ocultar o spinner
  function hideSpinner() {
    spinner.stop();
  }

btnGerar.addEventListener('click', async () => {
    const target = document.getElementById('spinner-container');
    if (!target) {
        console.error('Elemento target não encontrado!');
    } else {
        var spinner = new Spin.Spinner(opts).spin(target);
    }
    const persona = personaInput.value;
    const desejo = desejoInput.value;

    const data = {
        uri: "gs://documentos-ged/Book MSEP Digital.pdf", // URI fixo
        text1_1: desejo,
        textsi_1: persona
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição da API');
        }

        const responseData = await response.json();
        txtOutput.value = responseData.text;
        spinner.stop();
    } catch (error) {
        console.error('Erro:', error);
        txtOutput.value = 'Ocorreu um erro ao processar a solicitação.';
    }
    spinner.stop(); // Pára o spinner após a resposta
});
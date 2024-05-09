const btnGerar = document.getElementById('btnGerar');
const personaInput = document.getElementById('persona');
const desejoInput = document.getElementById('desejo');
const txtOutput = document.getElementById('txtoutput');
const target = document.getElementById('spinner-container');
var markdown = document.getElementById('markdown');

var opts = {
    lines: 13, // O número de linhas para desenhar
    length: 38, // O comprimento de cada linha
    width: 17, // A largura da linha
    radius: 50, // O raio do círculo interno
    scale: 1, // Fator de escala
    corners: 1, // Arredondamento dos cantos (0..1)
    color: '#b91d32', // Cor da linha #rgb ou #rrggbb ou array de cores
    fadeColor: 'transparent', // Cor do desbotamento das linhas
    speed: 2, // Rounds por segundo
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

const apiUrl = 'https://msepapi-jkwtayswda-uc.a.run.app/generate'; // Substitua com a URL da sua API

btnGerar.addEventListener('click', async () => {
    
    const persona = personaInput.value;
    const desejo = desejoInput.value;
    var spinner = new Spin.Spinner(opts);

    const data = {
        uri: "gs://documentos-ged/Book MSEP Digital.pdf", // URI fixo
        text1_1: desejo,
        textsi_1: persona
    };

    try {
        await spinner.spin(target);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        spinner.stop(target); // Pára o spinner após a resposta

        if (!response.ok) {
            throw new Error('Erro na requisição da API');
        }
        const responseData = await response.json();
        txt_markdown = responseData.text;
        var converter = new showdown.Converter();
        html = converter.makeHtml(txt_markdown);
        markdown.innerHTML = html;
        console.log(markdown);
        txtOutput.value = responseData.text;
    } catch (error) {
        console.error('Erro:', error);
        txtOutput.value = 'Ocorreu um erro ao processar a solicitação.';
    }
});
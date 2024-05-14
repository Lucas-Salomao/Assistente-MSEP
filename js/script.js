const btnGerar = document.getElementById('btnGerar');
const personaInput = document.getElementById('persona');
const desejoInput = document.getElementById('desejo');
const spinner = document.getElementById('spinGerar');
const txtStatus = document.getElementById('txtAguarde');
var markdown = document.getElementById('markdown');

spinner.hidden=true;
txtStatus.hidden=true;

const apiUrl = 'https://msepapi-jkwtayswda-uc.a.run.app/generate'; // Substitua com a URL da sua API

btnGerar.addEventListener('click', async () => {
    
    const persona = personaInput.value;
    const desejo = desejoInput.value;

    const data = {
        uri: "gs://documentos-ged/Book MSEP Digital.pdf", // URI fixo
        text1_1: desejo,
        textsi_1: persona
    };

    try {
        spinner.hidden=false;
        txtStatus.hidden=false;
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
        txt_markdown = responseData.text;
        var converter = new showdown.Converter();
        html = converter.makeHtml(txt_markdown);
        markdown.innerHTML = html;
        console.log(txt_markdown);
        txtStatus.value = responseData.text;
        spinner.hidden=true;
        txtStatus.hidden=true;
    } catch (error) {
        console.error('Erro:', error);
        txtStatus.value = 'Ocorreu um erro ao processar a solicitação.';
    }
});
async function buscarclima(cidade){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${CHAVE_API}&units=metric&lang=pt_br`
    const resposta = await fetch(url);
    const dados = await resposta.json()
    return dados;  /* tem que retornar os dados. Agora a função entrega a resposta da API para a sua variável dados de fora*/
}

const botaoBuscar = document.getElementById("btnBuscar");
const campoCidade = document.getElementById("cidade");
const divResultado = document.getElementById("resultado");

botaoBuscar.addEventListener("click", async function(){
    const cidade = campoCidade.value;

    if (cidade == ""){
        return;
    }

    const dados = await buscarclima(cidade);

    if (dados.cod === "404"){   /* tem igualdedade me js é com 3 === */
        divResultado.innerHTML = "<p> Cidade não encontrada.</p>";
        return;
    }

    divResultado.innerHTML = `
        <div class="card-clima">
            <h3>${dados.name}</h3>
            <p>${dados.weather[0].description}</p>
            <p><strong>${dados.main.temp}ºC</strong></p>
            <p>Sensação: ${dados.main.feels_like}ºC</p>
        </div>
    `;

});
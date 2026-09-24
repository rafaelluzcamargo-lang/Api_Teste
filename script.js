async function buscarclima(cidade){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${CHAVE_API}&units=metric&lang=pt_br`
    const resposta = await fetch(url);
    const dados = await resposta.json()
    return dados;  /* tem que retornar os dados. Agora a função entrega a resposta da API para a sua variável dados de fora*/
}

const botaoBuscar = document.getElementById("btnBuscar");
const campoCidade = document.getElementById("cidade");
const divResultado = document.getElementById("resultado");
const divPrevisao = document.getElementById("previsao");

botaoBuscar.addEventListener("click", async function(){
    const cidade = campoCidade.value;

    if (cidade == ""){
        return;
    }

    const dados = await buscarclima(cidade);

    async function realizarBusca(cidade){
        const dados = await buscarclima(cidade);

        if (dados.cod === "404"){   /* tem igualdedade me js é com 3 === */
        divResultado.innerHTML = "<p> Cidade não encontrada.</p>";
        return;
        }

        const iconeUrl = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
            
        divResultado.innerHTML = `
        <div class="card-clima">
            <img src="${iconeUrl}" alt="${dados.weather[0].description}">
            <h3>${dados.name}</h3>
            <p>${dados.weather[0].description}</p>
            <p><strong>${dados.main.temp}ºC</strong></p>
            <p>Sensação: ${dados.main.feels_like}ºC</p>
        </div>
    `;
        localStorage.setItem("ultimaCidade",cidade)

        const previsao = await buscarPrevisao(cidade);
        montarPrevisao(cidade);
        
    }

    function montarPrevisao(previsao){
        divPrevisao.innerHTML = "";

        for(let i = 0; i < previsao.list.length; i++){
            const item = previsao.list[i];

                if (item.dt_txt.includes("12:00:00")){
                const data = new Date(item.dt_txt);
                const diaSemana = data.toDateString("pt-BR", {weekday: "shot"});
                const iconeUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

                divPrevisao.innerHTML += `
                <div class="dia-previsao">
                    <p>${diaSemana}</p>
                    <img src="${iconeUrl}" alt="${item.weather[0].description}">
                    <p>${item.main.temp.toFixed(0)}ºc</p>
                </div>
            `
            }
        }
    }


    async function buscarPrevisao(cidade){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${CHAVE_API}&units=metric&lang=pt_br`
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    }



});
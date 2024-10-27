const weatherForm=document.querySelector('.weatherForm');
const cityInput=document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey='b450a11b73b36be85780aaa11b0c0446';
const back=document.querySelector('.background');
weatherForm.addEventListener('submit',async event=>{
    event.preventDefault();
    const city=cityInput.value;

    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
            back.style.filter='blur(5px)'
        }
        catch(error){
            console.log(error)
            displayError(error);
        }
    }

    else{
        displayError("Please enter a city.")
    }
})

async function getWeatherData(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response= await fetch(apiUrl);
  
    if(!response.ok){
        throw new Error("Couldn't fetch weather data.")
    }
    return await response.json();
}   

function displayWeatherInfo(data){
    console.log(data)
    const{name : city,main:{temp,humidity},weather: [{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement('h1');
    const tempDisplay=document.createElement('p');
    const humidityDisplay=document.createElement('p');
    const desDisplay=document.createElement('p');
    const weatherEmoji=document.createElement('p');

    cityDisplay.textContent=city;
    tempDisplay.textContent=(temp-273.15).toFixed(1)+"℃";
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    desDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    desDisplay.classList.add('desDisplay');
    weatherEmoji.classList.add('weatherEmoji');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherID){
    switch(true) {
        case (weatherID>=200 && weatherID<300):
            return '🌩';
        case (weatherID>=300 && weatherID<400):
            return '🌧';
        case (weatherID>=500 && weatherID<600):
            return '🌨';
        case (weatherID>=600 && weatherID<700):
            return '❄';
        case (weatherID>=700 && weatherID<800):
            return '🌫';
        case (weatherID===800 ):
            return '☀';
        case (weatherID>=801 && weatherID<810):
            return '☁';
        default:
            return '🌀';
    }

}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add('error');
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}
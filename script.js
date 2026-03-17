const apiKey = "597b053271b9f797a9c453e70912371d";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=597b053271b9f797a9c453e70912371d&lang=uz`;
    
    try {
        const response = await fetch(apiUrl);
        
        if(response.status === 404) {
            alert("Kechirasiz, bunday shahar yoki qishloq topilmadi!");
            return;
        }
        
        const data = await response.json();

        document.getElementById("location").innerHTML = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerHTML = Math.round(data.main.temp * 10) / 10;
        document.getElementById("description").innerHTML = data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error("Xatolik:", error);
        alert("Ma'lumot olishda xatolik yuz berdi. Internetni tekshiring.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city) {
        checkWeather(city);
    } else {
        alert("Iltimos, shahar nomini yozing!");
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if(city) checkWeather(city);
    }
});

checkWeather("Tashkent");
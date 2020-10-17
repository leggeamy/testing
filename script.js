//get info from user search for city

function getCityName() {
    var cityName = document.querySelector("#cityname").value;
    getWeatherData(cityName);
    makeRow(cityName);
}

function makeRow(cityName) {
    var liEl = document.createElement("li")
    liEl.classList.add("list-group-item", "list-group-item-action");
    var text = cityName;
    liEl.textContent = text;
    var historyEl = document.querySelector('.history');
    console.log(event.target)
    historyEl.onclick = function(){
        console.log(event.target.tagName)
        if (event.target.tagName === "li"){
            getWeatherData(event.target.textContent)
        }
    }
    historyEl.appendChild(liEl);
};

//fetch weather **forecast** data for that city from open weather API

function getForecast(cityname) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=ed3ceecb82da99a626e9f6aef02e2dbb&units=imperial")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        var forecastEl = document.querySelector("#forecast");
        forecastEl.innerHTML = "<h4 class=\"mt-3\">5-Day Forecast:</h4>";
        forecastRowEl = document.createElement("div");
        forecastRowEl.className = "\"row\"";

        //loop over all forecasts in 3-hour increments
        for (var i = 0; i <data.list.length; i++) {
            
            //only look at forecasts around 3pm
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                //create html elements for a bootstrap card
                var colEl = document.createElement("div");
                colEl.classList.add("col-md-2");
                var cardEl = document.createElement("div");
                cardEl.classList.add("card", "bg-dark", "text-white");
                var windEl = document.createElement("p");
                windEl.classList.add("card-text");
                windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + " MPH";
                var humidityEl = document.createElement("p");
                humidityEl.classList.add("card-text");
                humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                var bodyEl = document.createElement("div");
                bodyEl.classList.add("card-body", "p-2");
                var titleEl = document.createElement("h5");
                titleEl.classList.add("card-title");
                titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString()
                var imgEl = document.createElement("img")
                imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" )
                var p1El = document.createElement("p");
                p1El.classList.add("card-text");
                p1El.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
                var p2El = document.createElement("p");
                p2El.classList.add("card-text");
                p2El.textContent = "Humidty: " + data.list[i].main.humidity + "%";

                //merge together and display on page
                colEl.appendChild(cardEl);
                bodyEl.appendChild(titleEl);
                bodyEl.appendChild(imgEl);
                bodyEl.appendChild(windEl);
                bodyEl.appendChild(humidityEl);
                bodyEl.appendChild(p1El);
                bodyEl.appendChild(p2El);
                cardEl.appendChild(bodyEl);
                forecastEl.appendChild(colEl);

            }
        }
    });
}


document.querySelector("#search-button").addEventListener("click", function(e) {
    e.preventDefault()
    getCityName();
});
    





//plot chart - line graph showing temperature

function BuildChart(labels, values, chartTitle) {
    var data = {
        labels: labels,
        datasets: [{
            label: chartTitle, //name the series
            data: values,
            backgroundColor: ['rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
        ],
    }],
};
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart (ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes : [{
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature'
                }
            }]
        },
    }
});
return myChart;
}

//get daily temperature data from JSON object

        var json = JSON.parse(this.response);
        //map JSON labels back to values array
        var labels = json.map(function (e) {
            return e.date; // *******check if this works for json data in weather API // "data.list[i].dt_txt"
        });
        //map JSON values back to values array
        var values = json.map(function (e) {
            return (e.temp); // *******check if this works for json data in weather API
        });
        BuildChart(labels, values, "Forecast Temperatures"); // pass in data and call the chart

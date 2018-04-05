"use strict";

var data = {}; // our data
var url;

function success(position) {
    data.lat = position.coords.latitude;
    data.lon = position.coords.longitude;

    url = "https://fcc-weather-api.glitch.me/api/current?lat=" + data.lat + "&lon=" + data.lon;
    getWeather();
}

function failure() {
    $(".container").html("<b>Failed to get location...</b>");
    $(".container").toggleClass("hidden");
}

function getWeather() {
    $.getJSON(url, function(json) {
        assignData(json);
        updatePage();
        addListeners();

    });
}


// assigning our data
function assignData(json) {
    data.lat = json.coord.lat;
    data.lon = json.coord.lon;
    data.temp = json.main.temp;
    data.pressure = json.main.pressure;
    data.humidity = json.main.humidity;
    data.tempMin = json.main.temp_min;
    data.tempMax = json.main.temp_max;
    data.location = json.name;
    data.country = json.sys.country;
    data.windSpeed = json.wind.speed;
    data.weather = json.weather[0].main;
    data.icon = json.weather[0].icon;
    // data.sunrise = new Date(json.sys.sunrise);
    // data.sunset = new Date(json.sys.sunset);
}





function updatePage() {
    $("#lat").text(data.lat);
    $("#lon").text(data.lon);
    $("#location").text(data.location);
    $("#temp").text(data.temp);
    $("#country").text(data.country);
    $("#weather").text(data.weather);
    $("#pressure").text(data.pressure);
    $("#humidity").text(data.humidity);
    // $("#sunriseHour").text(data.sunrise.getHours());
    // $("#sunriseMin").text(data.sunrise.getMinutes());
    // $("#sunsetHour").text(data.sunset.getHours());
    // $("#sunsetMin").text(data.sunset.getMinutes());
    $("#icon").attr("src", data.icon);
    $("#icon").attr("alt", 'The ' + data.weather + 'weather icon');


    $(".container").toggleClass("hidden"); // unhides everything once we get location data


}

// click anywhere to convert temp
function addListeners() {
    $("html").on("click", function() {
        // using == because we're comparing string to number
        $("#temp").text() == data.temp ? $("#temp").text(toF()) && $("#degree").html("<b>F</b>") : $("#temp").text(data.temp) && $("#degree").html("<b>C</b>");
    });
}

//convert C to F
function toF() {
    return (data.temp * (9 / 5) + 32).toFixed(2); // cutting off extra decimals
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(success, failure);
});
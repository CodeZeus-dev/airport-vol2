'use strict';

class Weather {
    requestWeather() {
        let randomWeather = (Math.random() * 10) + 1;
        if (randomWeather <= 8) {
            return "sunny";
        } else {
            return "stormy";
        }
    }
}
'use strict';

const DEFAULT_CAPACITY = 35;

class Airport {

    static get defaultCapacity(){
        return DEFAULT_CAPACITY;
    }

    constructor(capacity=Airport.defaultCapacity, airportWeather = new Weather()) {
        this.capacity = capacity;
        this.landedPlanes = [];
        this.airportWeather = airportWeather;
    }

    inboundFlight(plane){
        if(this.airportWeather.requestWeather === 'stormy') {
            throw new Error('Landing denied due to stormy weather.');
        }
        if(this._isFull()) {
            throw new Error("Landing denied - Airport in full capacity");
        }
        if(!this.landedPlanes.includes(plane)) {
            this.landedPlanes.push(plane);
        }
    }

    outboundFlight(plane) {
        if (this.airportWeather.requestWeather === 'stormy') {
            throw new Error('Landing denied due to stormy weather.')
        }
        if (this._isAtAirport(plane)) {
            throw new Error('Take off denied as plane is not at the airport');
        }
        this.landedPlanes = this.landedPlanes.filter(function (value, index, arr) {
            return value !== plane;
        });
        return this.landedPlanes;
    }

    _isFull(){
        return this.landedPlanes.length === this.capacity;
    }

    _isAtAirport(plane){
        return !this.landedPlanes.includes(plane);
    }
}
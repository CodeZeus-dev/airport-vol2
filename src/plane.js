'use strict';

class Plane{

    land(airport = new Airport()){
        airport.inboundFlight(this);
        return `Plane ${this} landed at ${airport}.`;
    }

    takeOff(airport = new Airport()){
        airport.outboundFlight(this);
        return `Plane ${this} took off from ${airport}.`;
    }
}
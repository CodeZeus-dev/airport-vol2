'use strict';

describe('Airport', function() {

    let airport;
    let airportOne;
    let plane;
    let weather;

    beforeEach(function() {
        airport = new Airport();
        airportOne = new Airport(1);
        plane = new Plane();// jasmine.createSpyObj('plane', ['land']);
        weather = jasmine.createSpyObj('weather', ['requestWeather']);
    });

    describe('it overrides airport capacity', function(){
        it('when user puts it as an argument', function() {
            airport = new Airport(15);
            expect(airport.capacity).toEqual(15);
        });
    });

    describe('#inboundFlight', function() {
        it('responds to inboundFlight', function() {
            expect(airport.inboundFlight).not.toBeUndefined();
        });

        it('appends the incoming plane to landed planes', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("sunny");
            plane.land(airport);
            expect(airport.landedPlanes[airport.landedPlanes.length - 1]).toEqual(plane);
        });

        it('raises an Exception when trying to land at a full airport', function() {
            spyOn(airportOne.airportWeather, 'requestWeather').and.returnValue("sunny");
            plane.land(airportOne);
            expect( function() { (new Plane()).land(airportOne); } ).toThrowError("Landing denied - Airport in full capacity");
        });

        it('raises an exception when trying to land and weather is stormy', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("stormy");
            expect( function() {airport.inboundFlight(new Plane());} ).toThrowError("Landing denied due to stormy weather.");
        });
    });

    describe('#outboundFlight', function() {
        it('responds to the outboundFlight method', function() {
            expect(airport.outboundFlight()).not.toBeUndefined();
        });

        it('removes a plane from the landed_planes list based on the plane number', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("sunny");
            plane.land(airport);
            expect(airport.outboundFlight(plane)).toEqual(plane);
        });

        it('raises an exception when trying to take off and weather is stormy', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("stormy");
            expect( function() {airport.outboundFlight(plane);} ).toThrowError("Take off denied due to stormy weather.");
        });

        it('raises an exception when trying to take off but plane is not present at the airport', function() {
           spyOn( airport.airportWeather, "requestWeather" ).and.returnValue("sunny");
           expect( function() {airport.outboundFlight(new Plane());} ).toThrowError("Take off denied as plane is not at the airport");
        });
    });
});
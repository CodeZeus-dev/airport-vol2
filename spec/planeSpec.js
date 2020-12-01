'use strict';

describe('Plane', function() {

    var plane;
    var airport;

    beforeEach(function() {
        plane = new Plane();
        airport = new Airport;
    });

    describe('a plane should be', function() {
        it('an instance of the Plane class', function() {
            expect(plane).toBeInstanceOf(Plane);
        });
    });

    describe('#land', function() {
        it('responds to the land function', function() {
            expect(plane.land()).not.toBeUndefined();
        });

        it('lands at a specific airport', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("sunny");
            expect(plane.land(airport)).toEqual(`Plane ${plane} landed at ${airport}.`);
        });

        it('asks from airport to append plane to landed ones', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("sunny");
            plane.land(airport);
            expect(airport.landedPlanes[airport.landedPlanes.length - 1]).toEqual(plane);
        });
    });

    describe('#takeOff', function() {
        it('responds to the takeOff function', function() {
            expect(plane.takeOff()).not.toBeUndefined();
        });

        it('takes off from a specific airport', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("sunny");
            expect(plane.takeOff(airport)).toEqual(`Plane ${plane} took off from ${airport}.`);
        });

        it('asks the airport to remove the plane from the landedPlanes list', function() {
            spyOn(airport.airportWeather, "requestWeather").and.returnValue("sunny");
            plane.land(airport);
            expect(airport.outboundFlight(plane)).toEqual([]);
        });
    });
});
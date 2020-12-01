'use strict';

describe('Weather', function() {
    var weather;
    beforeEach(function() {
        weather = new Weather();
    });

    describe('#requestWeather', function() {
        it('responds to the requestWeather function', function() {
            expect(weather.requestWeather()).not.toBeUndefined();
        });

        it('returns the weather conditions at a specific airport', function() {
            expect(["sunny", "stormy"]).toContain(weather.requestWeather());
        });
    });
});
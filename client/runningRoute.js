var runningRoute = L.map('runningRoute').setView([29.7604, -95.3698], 13);
var distance;
runningRoute.locate({setView: true});


L.control.locate().addTo(runningRoute);

L.tileLayer('https://api.mapbox.com/styles/v1/davflo-16/ciwvhkb9s00ff2pnx7nix4bx8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF2ZmxvLTE2IiwiYSI6ImNpd3ZoZG43aDAwcnYydHNhbHNsc2FyOG8ifQ.dNmw9UwoMTPzkUCNhwh2RA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(runningRoute);

var control = L.Routing.control({
    routeWhileDragging: true
}).addTo(runningRoute);

control.on('routesfound', function(e) {
    distance = (e.routes[0].summary.totalDistance * 0.000621371).toFixed(2);
    console.log(distance);
    $('#distanceField').val(distance);
});

control.hide();




function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

runningRoute.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(runningRoute);

    L.DomEvent.on(startBtn, 'click', function() {
            control.spliceWaypoints(0, 1, e.latlng);
            runningRoute.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function() {
            control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
            runningRoute.closePopup();
    });
});


/* Initialize map */
var map = L.map('map').setView([37.7, -122.4], 10);

/* Load a Stamen tile layer: */

var Stamen_Terrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
}).addTo(map);


$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/refs/heads/main/Module%201/Assignment%201/data/sf_crime.geojson",function(data){
    var sluIcon = L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Saint_Louis_Billikens_logo.svg/1200px-Saint_Louis_Billikens_logo.svg.png',
      iconSize: [60,60]
    });
    var crimes = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: sluIcon});
        marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT + '<br/>' + feature.properties.SUBJECT);
        return marker;
      }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(crimes);
    map.addLayer(clusters);
});

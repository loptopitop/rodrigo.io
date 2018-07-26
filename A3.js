
var t = 0;
var locations = [
    { name: "ON", lat: 43.665636, long: -79.368755 },
    { name: "AB", lat: 53.533476, long: -113.506638 },
    { name: "SK", lat: 50.432489, long: -104.615207 },
    { name: "BC", lat: 48.419617, long: -123.370285 },
    { name: "YK", lat: 60.716916, long: -135.049480 },
    { name: "QB", lat: 46.808706, long: -71.214179 },
    { name: "NT", lat: 62.457140, long: -114.371398 },
    { name: "NV", lat: 63.750601, long: -68.523012 },
    { name: "NS", lat: 44.647946, long: -63.573349 },
    { name: "MN", lat: 49.884585, long: -97.146929 },
    { name: "NL", lat: 47.583191, long: -52.724247 },
    { name: "NB", lat: 45.959307, long: -66.636281 },
    { name: "PI", lat: 46.234748, long: -63.125659 },
    { name: "my_pos", lat: 0, long: 0 }
];

function myMap(customposition = false) {
    if (!customposition) {
        t = document.getElementById("123").value;
        lat = locations[t].lat;
        long = locations[t].long;
    }
    else {
        lat = locations[13].lat;
        long = locations[13].long;
    }
    // var value = document.getElementById("123").value;
    // console.log(value);
    var mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

}

function Seemylocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {

            console.log(position);

            locations[13].lat = position.coords.latitude;
            locations[13].long = position.coords.longitude;
            var province = getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
            console.log(province);

            
            myMap(true);
        }
    }
    else {
        alert('Geolocation is turned off. Select the loctaion manually');
    }
}


function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            address = results[0];
            for (e in address.address_components) {
                component_obj = address.address_components[e];
                if (['ON', 'BC'].indexOf(component_obj.short_name) >= 0) {
                   return component_obj.short_name;
                }
            }



        }


    }
    );
}



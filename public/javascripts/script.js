var map, geocoder, infoWindow;

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -15.7801, lng: -47.9292 },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    });

    // Marca eventos no mapa
    var eventos = JSON.parse(document.getElementById('test').value);
    eventos.forEach((e) => {

        // Transforma endereco em latLng
        var endereco = e.endereco.replace("(", "").replace(")", "").replace(",", "");
        var endereco = endereco.split(" ");
        var latLng = { lat: parseFloat(endereco[0]), lng: parseFloat(endereco[1]) };
        e.data = e.data.substring(0, 10);

        // Cria marcador para o endereco
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
        });

        var infowindow = new google.maps.InfoWindow({
            content: "<b>TITULO: " + e.titulo + "</b><br/>"
                    + "DATA: " + e.data + "<br/>"
                    + "TEMA: " + e.tema
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        
    })

    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Você está aqui.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
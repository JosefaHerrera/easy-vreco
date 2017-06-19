function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: -9.1191427, lng: -77.0349046 },
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
    });


        function buscar() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
        }
    }

    document.getElementById('encuentrame').addEventListener('click', buscar);
    var latitud, longitud;

    var funcionExito = function(posicion) {
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;

        var miUbicacion = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            animation: google.maps.Animation.DROP,
            map: map,
            icon: 'http://pix.iemoji.com/phan33/0147.png'
        });

        map.setZoom(17);
        map.setCenter({ lat: latitud, lng: longitud });
    }

    var funcionError = function(error) {
        alert('Tenemos un problema con encontrar tu ubicación');
    }
                            /*RUTA*/


    /* AUTOCOMPRETADO INPUT */
    //input1
    var inputOrigen = (document.getElementById("origen"));
    var autocomplete = new google.maps.places.Autocomplete(inputOrigen);
        autocomplete.bindTo("bounds", map);
    //input2
    var inputDestino = (document.getElementById("destino"));
    var autocomplete = new google.maps.places.Autocomplete(inputDestino);
        autocomplete.bindTo("bounds", map);

/*DirectionsService:
Puedes calcular indicaciones (usando varios métodos de transporte) con el objeto DirectionsService.
Este objeto se comunica con el servicio de indicaciones de la Google Maps API,
 el cual recibe solicitudes de indicaciones y devuelve resultados computados.
Puedes administrar estos resultados de indicaciones por ti mismo o usar el objeto DirectionsRenderer para representarlos.
DirectionsRenderer:
<!-- DEFINICION-->

*/

    /*INDICACIONES * Servicio de indicaciones*/
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    document.getElementById("origen").addEventListener("change", onChangeHandler);
    document.getElementById("destino").addEventListener("change", onChangeHandler);


    function lineaRuta(directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById("origen").value,
            destination: document.getElementById('destino').value,
            travelMode: "DRIVING"
            },
        function(response, status) {
            if (status === "OK") {
                directionsDisplay.setDirections(response);
            } else {
                window.alert("Ruta no disponible"+ status);
            }
        });
    }
    directionsDisplay.setMap(map);
        //onChangeHandler = Agregar una propiedad de seguimiento a una definición de lenguaje específico de dominio
        var onChangeHandler = function(){
            //Servicio de indicaciones
        lineaRuta(directionsService, directionsDisplay);
    }; 
    
    document.getElementById("ruta").addEventListener("click",onChangeHandler); 
};



/*
Modos de viaje

Al calcular indicaciones, debes especificar el modo de transporte que se usará. Actualmente, 
se admiten los siguientes modos de viaje:

*DRIVING (predeterminado) establece indicaciones de manejo estándar por la red de carreteras.
*BICYCLING solicita indicaciones para el traslado en bicicleta por ciclovías y calles preferidas.
*TRANSIT solicita indicaciones por rutas de transporte público.
*WALKING solicita indicaciones de traslado a pie por sendas peatonales y veredas.


 */















var mylatlng = { lat: 10.762622, lng: 106.660172 };
var mapOptions = {
    center: mylatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};







// Map 
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)


// Route
var route = new google.maps.DirectionsService();

// Route render
var routeRender = new google.maps.DirectionsRenderer();


// connect renderer to map
routeRender.setMap(map)


// Calculate 
function calcRoute() {
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    route.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            const output = document.querySelector('#output');
            output.innerHTML = "<div class ='alert-info'>" + "Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Time: " + result.routes[0].legs[0].duration.text + ".</div>";


            routeRender.setDirections(result);
        }
    });
}

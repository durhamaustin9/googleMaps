function initMap() {

    //Setting map focus point on the USA
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.5, lng: -98.35},
        zoom: 4
    });

    var input = document.getElementById('searchContent');

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);



    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            // window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);



        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        // infowindowContent.children['place-icon'].src = place.icon;
        // infowindowContent.children['place-name'].textContent = place.name;
        // infowindowContent.children['place-address'].textContent = address;
        // infowindow.open(map, marker);
    });
}


$(document).ready(function () {
    document.getElementById('searchContent').onkeydown = function(event, element) {
        if (event.keyCode === 13) {
            event.preventDefault();


            var firstResult = $(".pac-container .pac-item:first").text();

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({"address":firstResult }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 39.5, lng: -98.35},
                        zoom: 4
                    });

                    var place = results[0];

                    var marker = new google.maps.Marker({
                        map: map,
                        anchorPoint: new google.maps.Point(0, -29)
                    });

                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);  // Why 17? Because it looks good.
                    }

                    marker.setPosition(place.geometry.location);
                }
            });
        } else {
            $(".pac-container").css("visibility","visible");
        }
    };

    document.getElementById("searchButton").addEventListener("click", function(event){
        event.preventDefault();

        var firstResult = $(".pac-container .pac-item:first").text();

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({"address":firstResult }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 39.5, lng: -98.35},
                    zoom: 4
                });

                var place = results[0];

                var marker = new google.maps.Marker({
                    map: map,
                    anchorPoint: new google.maps.Point(0, -29)
                });

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);  // Why 17? Because it looks good.
                }

                marker.setPosition(place.geometry.location);
            }
        });
    });
});
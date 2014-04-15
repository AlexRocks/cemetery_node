angular.module('mean').directive('pmGoogleMap', function factory($window, $rootScope/*, Places*/) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            function setMapHeight() {
                var mapHeight = 200;//$window.innerHeight - $('header').height() - $('footer').height() - 220;
                element.css('height', mapHeight);
            }
            setMapHeight();

            scope.map = null;



            function initialize() {
                var defaults = {
                    center: new google.maps.LatLng(48.86, 2.34),
                    zoom: 8,
                    panControl: true,
                    zoomControl: true,
                    scaleControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                scope.map = new google.maps.Map(element[0], defaults);
            }
            if (scope.map === null) {
                initialize();
            }

            function getDescription(place) {
                console.log(place);

                return '<h4>' + place.p_title + '</h4>';// + markdown.toHTML(place.p_description);
            }

            function setMarkerOnClickEvent(marker) {
                google.maps.event.addListener(marker, 'click', function(event) {
                    var place = Places.get(marker.pid);
                    var latlng = new google.maps.LatLng(place.p_lat, place.p_lng);
                    infoBox.setContent(getDescription(place));
                    infoBox.setPosition(latlng);
                    infoBox.open(scope.map);
                });
            }

            scope.markers = [];
            var infoBox = new google.maps.InfoWindow();
            scope.marker = null;
            /*

             $rootScope.$on('places:updated', function() {
             scope.markers = [];
             infoBox.close();
             var bounds = new google.maps.LatLngBounds();
             angular.forEach(Places.getAll(), function(place) {
             var latlng = new google.maps.LatLng(place.p_lat, place.p_lng);
             bounds.extend(latlng);
             var marker = new google.maps.Marker({
             position: latlng,
             map: scope.map,
             title: place.p_title,
             pid: place.id
             });
             setMarkerOnClickEvent(marker);
             scope.markers.push(marker);
             });
             scope.map.fitBounds(bounds);
             });

             $rootScope.$on('place:updated', function(event, place) {
             infoBox.close();
             angular.forEach(scope.markers, function(marker) {
             if (marker.pid == place.id) {
             var latlng = new google.maps.LatLng(place.p_lat, place.p_lng);
             marker.setTitle(place.p_title);
             marker.setPosition(latlng);
             scope.map.setCenter(latlng);
             infoBox.setContent(getDescription(place));
             infoBox.setPosition(latlng);
             infoBox.open(scope.map);
             return false;
             }
             });
             });

             $rootScope.$on('place:added', function(event, place) {
             var latlng = new google.maps.LatLng(place.p_lat, place.p_lng);
             var marker = new google.maps.Marker({
             position: latlng,
             map: scope.map,
             title: place.p_title,
             pid: place.id
             });
             setMarkerOnClickEvent(marker);
             scope.markers.push(marker);
             infoBox.setContent(getDescription(place));
             infoBox.setPosition(latlng);
             infoBox.open(scope.map);
             scope.map.setCenter(latlng);
             });

             $rootScope.$on('place:show', function(event, place) {
             var latlng = new google.maps.LatLng(place.p_lat, place.p_lng);
             infoBox.setContent(getDescription(place));
             infoBox.setPosition(latlng);
             infoBox.open(scope.map);
             scope.map.setCenter(latlng);
             });

             $rootScope.$on('place:deleted', function(event, place) {
             infoBox.close();
             angular.forEach(scope.markers, function(marker, i) {
             if (marker.pid == place.id) {
             marker.setMap(null);
             scope.markers.splice(i, 1);
             return false;
             }
             });
             });
             */

            $rootScope.$on('map:show', function(event, place) {
                if (place.position) {
                    if (typeof place.position === 'object') {
                        var latlng = new google.maps.LatLng(Math.round(place.position.k * 100) / 100, Math.round(place.position.A * 100) / 100);
                        infoBox.setContent(getDescription(place));
                        infoBox.setPosition(latlng);
                        infoBox.open(scope.map);
                        scope.map.setCenter(latlng);
                    }
                }
            });

            google.maps.event.addListener(scope.map, 'click', function(event) {
                // $apply explanation http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
                scope.$apply(function() {

                    infoBox.close();
                    var latlng = new google.maps.LatLng(Math.round(event.latLng.lat() * 100) / 100, Math.round(event.latLng.lng() * 100) / 100);
                    if (scope.marker) {
                        scope.marker.setPosition(latlng);
                        scope.map.setCenter(latlng);
                    } else {
                        scope.marker = new google.maps.Marker({
                            position: latlng,
                            map: scope.map
                        });
                    }

                    $rootScope.$broadcast('map:pointSelected', {
                        position: scope.marker.getPosition()
                    });
//                    setMarkerOnClickEvent(scope.marker);
                });
            });
        }
    };
});
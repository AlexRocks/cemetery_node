angular.module('mean').directive('polGoogleMap', function factory($window, $rootScope/*, Places*/) {
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

                });

                google.maps.event.addListener(marker, 'rightclick', function(event) {
                    angular.forEach(scope.markers, function(imarker, i) {
                        if (imarker === marker) {
                            marker.setMap(null);
                            scope.markers.splice(i, 1);
                            return false;
                        }
                    });
                    changePolygon();
                });
            }

            function setMarkerOnDragendEvent(marker) {
                google.maps.event.addListener(marker, 'dragend', function(event) {
                    changePolygon();
                });
            }

            function changePolygon() {
                var triangleCoords = [];
                angular.forEach(scope.markers, function(marker, i) {
                    triangleCoords.push(marker.getPosition());
                });

                if (!scope.bermudaTriangle) {
                    scope.bermudaTriangle = new google.maps.Polygon({
                        paths: triangleCoords,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35
                    });
                    scope.bermudaTriangle.setMap(scope.map);
                } else {
                    scope.bermudaTriangle.setPath(triangleCoords);
                }
                $rootScope.$broadcast('polmap:coordsSelected', {
                    triangleCoords: triangleCoords
                });
            }

            scope.markers = [];
            var infoBox = new google.maps.InfoWindow();
            scope.marker = null;

            scope.triangleCoords = [];
            scope.bermudaTriangle = null;


            $rootScope.$on('polmap:centerpoint', function(event, place) {
                if (place.position) {
                    if (typeof place.position === 'object') {
                        var latlng = new google.maps.LatLng(Math.round(place.position.k * 100) / 100, Math.round(place.position.A * 100) / 100);
                        scope.map.setCenter(latlng);
                    }
                }
            });

            $rootScope.$on('polmap:show', function(event, coords) {
                if (coords) {
                    if (coords.length > 0) {
                        var bounds = new google.maps.LatLngBounds();
                        angular.forEach(coords, function(val, i) {
                            var latlng = new google.maps.LatLng(Math.round(val.k * 100) / 100, Math.round(val.A * 100) / 100);
                            var marker = new google.maps.Marker({
                                position: latlng,
                                map: scope.map,
                                draggable: true
                            });
                            bounds.extend(latlng);
                            setMarkerOnClickEvent(marker);
                            setMarkerOnDragendEvent(marker);
                            scope.markers.push(marker);

                            return false;
                        });
                        scope.map.fitBounds(bounds);
                        changePolygon();
                    }
                }
            });

            $rootScope.$on('polmap:clear', function(event, place) {
                angular.forEach(scope.markers, function(marker, i) {
                    marker.setMap(null);
                    scope.markers.splice(i, 1);
                    return false;
                });
                scope.bermudaTriangle.setMap(null);
            });

            google.maps.event.addListener(scope.map, 'click', function(event) {
                // $apply explanation http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
                scope.$apply(function() {

                    var latlng = new google.maps.LatLng(Math.round(event.latLng.lat() * 100) / 100, Math.round(event.latLng.lng() * 100) / 100);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: scope.map,
                        draggable: true
                    });
                    setMarkerOnClickEvent(marker);
                    setMarkerOnDragendEvent(marker);
                    scope.markers.push(marker);

                    changePolygon();
                });
            });
        }
    };
});
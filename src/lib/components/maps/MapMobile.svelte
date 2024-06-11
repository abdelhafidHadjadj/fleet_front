<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    export let pointA;
    export let pointB;

    let map;
    let userMarker;
    let destinationMarkerA;
    let destinationMarkerB;
    let userLocation;
    let destinationA = pointA; // Coordinates for point A
    let destinationB = pointB; // Coordinates for point B
    let destination = destinationA; // Initial destination
    let route;

    function updateUserLocation(position) {
        userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        console.log('User location updated:', userLocation);

        if (!userMarker) {
            userMarker = new mapboxgl.Marker({ color: 'blue' })
                .setLngLat([userLocation.lng, userLocation.lat])
                .addTo(map);
        } else {
            userMarker.setLngLat([userLocation.lng, userLocation.lat]);
        }

        map.setCenter([userLocation.lng, userLocation.lat]);

        updateRoute();
    }

    async function updateRoute() {
        if (route) {
            route.remove();
        }

        try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${destination.lng},${destination.lat}?geometries=geojson&steps=true&access_token=pk.eyJ1IjoiaGFmaWRldiIsImEiOiJjbHd5eW80bzMwMjF1MmtzN3Y3aWluZmVrIn0.9sDV5QNSefWnKwtKgXkYIA`);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const routeData = data.routes[0].geometry;
                if (!map.getSource('route')) {
                    map.addSource('route', {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': routeData
                        }
                    });
                } else {
                    map.getSource('route').setData(routeData);
                }

                if (!map.getLayer('route')) {
                    map.addLayer({
                        'id': 'route',
                        'type': 'line',
                        'source': 'route',
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#3887be',
                            'line-width': 5,
                            'line-opacity': 0.75
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    }

    function changeDestination() {
        destination = destination === destinationA ? destinationB : destinationA;
        const button = document.querySelector('.btn');
        button.textContent = destination === destinationA ? 'To End Point' : 'To Start Point';

        updateRoute();
    }

    onMount(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFmaWRldiIsImEiOiJjbHd5eW80bzMwMjF1MmtzN3Y3aWluZmVrIn0.9sDV5QNSefWnKwtKgXkYIA';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [3.042, 36.7525],
            zoom: 13
        });

        map.on('load', () => {
            console.log('Map loaded');

            // Add marker for destination A
            destinationMarkerA = new mapboxgl.Marker({ color: 'green' })
                .setLngLat([destinationA.lng, destinationA.lat])
                .addTo(map);
            console.log('Destination A marker added:', destinationA);

            // Add marker for destination B
            destinationMarkerB = new mapboxgl.Marker({ color: 'red', opacity: 0 })
                .setLngLat([destinationB.lng, destinationB.lat])
                .addTo(map);
            console.log('Destination B marker added:', destinationB);

            navigator.geolocation.watchPosition(updateUserLocation, (err) => {
                console.error('Error obtaining user location:', err);
            }, {
                enableHighAccuracy: true
            });

            updateRoute();
        });
    });
</script>

<button class="py-2 px-4 m-5 font-semibold rounded-full btn absolute text-white bg-[#0F0127] z-10" class:btn-red={destination === destinationA} class:btn-green={destination === destinationB} on:click={changeDestination}>Change Destination</button>
<div class="w-screen h-screen overflow-hidden">
<div id="map"></div>
</div>
<style>
    #map {
        position: relative;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
    }
    .btn-red {
        background-color: red;
    }
    .btn-green {
        background-color: green;
    }
</style>

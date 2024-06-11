<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

    export let startingPlace;
    export let destination;
    const dispatch = createEventDispatcher();

    onMount(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFmaWRldiIsImEiOiJjbHd5eW80bzMwMjF1MmtzN3Y3aWluZmVrIn0.9sDV5QNSefWnKwtKgXkYIA';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: startingPlace || [-79.4512, 43.6568],
            zoom: 13
        });

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken
        });

        map.addControl(directions, 'top-left');

        // Set initial route if startingPlace and destination are provided
        if (startingPlace && destination) {
            directions.setOrigin(startingPlace);
            directions.setDestination(destination);
        }

        directions.on('origin', (event) => {
            if (event.feature && event.feature.geometry && event.feature.geometry.coordinates) {
                startingPlace = event.feature.geometry.coordinates;
                dispatch('startingPlaceChanged', { startingPlace });
            }
        });

        directions.on('destination', (event) => {
            if (event.feature && event.feature.geometry && event.feature.geometry.coordinates) {
                destination = event.feature.geometry.coordinates;
                dispatch('destinationChanged', { destination });
            }
        });

        directions.on('route', (event) => {
            if (event.route && event.route.length > 0) {
                const route = event.route[0];
                const distance = route.distance;
                const duration = route.duration;
                dispatch('routeChanged', { distance, duration });
            }
        });
    });
</script>

<div id="map"></div>

<style>
    #map {
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 600px) {
        #map {
            height: 100vh;
        }
    }
</style>

<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';

    let map;
    let markers = {};

    function initWebSocket() {
        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {
            console.log("WebSocket connection opened");
        };

        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
            updateMarkerPosition(JSON.parse(event.data));
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    async function updateMarkerPosition(data) {
        const { vehicle_id, lat, lng } = data;
        let marker = markers[vehicle_id];

        if (!marker) {
            marker = new mapboxgl.Marker()
                .setLngLat([parseFloat(lng), parseFloat(lat)])
                .addTo(map);

            markers[vehicle_id] = marker;
        } else {
            marker.setLngLat([parseFloat(lng), parseFloat(lat)]);
        }
    }

    onMount(async () => {
        initWebSocket();

        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFmaWRldiIsImEiOiJjbHd5eW80bzMwMjF1MmtzN3Y3aWluZmVrIn0.9sDV5QNSefWnKwtKgXkYIA';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [3.042, 36.7525],
            zoom: 13
        });

        map.on('load', async () => {
            // Load the Cloudinary image as an icon
            map.loadImage(
                'https://res.cloudinary.com/gestionprojet/image/upload/v1717271060/drone_pdb7p6.png',
                (error, image) => {
                    if (error) throw error;
                    map.addImage('drone-icon', image);
                    map.addImage('car-icon', image);
                }
            );

            const geojson = await getLocation();
            map.addSource('vehicles', {
                type: 'geojson',
                data: geojson
            });
            map.addLayer({
                'id': 'vehicles',
                'type': 'symbol',
                'source': 'vehicles',
                'layout': {
                    'icon-image': ['get', 'icon'],
                    'icon-size': 0.1
                }
            });

            const updateSource = setInterval(async () => {
                const geojson = await getLocation();
                map.getSource('vehicles').setData(geojson);
            }, 1000);
        });
    });

    async function getLocation() {
        try {
            // Récupérer les données actuelles des véhicules depuis les marqueurs
            const features = Object.keys(markers).map(vehicle_id => {
                const marker = markers[vehicle_id];
                const { lng, lat } = marker.getLngLat();
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    properties: {
                        icon: 'drone-icon'
                    }
                };
            });

            // Créer un objet GeoJSON avec les nouvelles données
            const geojson = {
                type: 'FeatureCollection',
                features: features
            };

            return geojson;
        } catch (err) {
            console.error('Failed to fetch location data:', err);
        }
    }
</script>

<div class="w-screen h-screen overflow-hidden">
    <div id="map"></div>
</div>

<style>
    #map { position: relative; top: 0; bottom: 0; width: 100%; height: 100%; }
</style>

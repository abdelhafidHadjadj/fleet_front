<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';

    let map;

    onMount(async () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFmaWRldiIsImEiOiJjbHd2MnF4Z3Mwa2lpMm9yMXA4c203N3pzIn0.oyH-nptbSOQIm6bQaDXhiQ';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [3.042, 36.7525],
            zoom: 13
        });

        map.on('load', async () => {
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
                    'icon-image': 'car-icon', // Utilize the icon name defined in addImage
                    'icon-size': 0.1
                }
            });

            const updateSource = setInterval(async () => {
                const geojson = await getLocation(updateSource);
                map.getSource('vehicles').setData(geojson);
            }, 2000);
        });

        // Load the Cloudinary image as an icon
        map.on('style.load', () => {
            map.loadImage(
                'https://res.cloudinary.com/gestionprojet/image/upload/v1717271060/drone_pdb7p6.png',
                (error, image) => {
                    if (error) throw error;
                    map.addImage('drone-icon', image);
                }
            );
            map.loadImage(
                'https://res.cloudinary.com/gestionprojet/image/upload/v1717271060/drone_pdb7p6.png',
                (error, image) => {
                    if (error) throw error;
                    map.addImage('car-icon', image);
                }
            );
        });
    });

    async function getLocation(updateSource) {
        try {
            // Generate random coordinates in Alger Centre
            const minLatitude = 36.7;  // Limite inférieure de latitude
            const maxLatitude = 36.8;  // Limite supérieure de latitude
            const minLongitude = 3.0;  // Limite inférieure de longitude
            const maxLongitude = 3.1;  // Limite supérieure de longitude
            const latitude1 = minLatitude + Math.random() * (maxLatitude - minLatitude);
            const longitude1 = minLongitude + Math.random() * (maxLongitude - minLongitude);
            const latitude2 = minLatitude + Math.random() * (maxLatitude - minLatitude);
            const longitude2 = minLongitude + Math.random() * (maxLongitude - minLongitude);
            // Create markers for the random coordinates
            const marker1 = new mapboxgl.Marker()
                .setLngLat([longitude1, latitude1])
                .addTo(map);

            const marker2 = new mapboxgl.Marker()
                .setLngLat([longitude2, latitude2])
                .addTo(map);

            return {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [longitude1, latitude1]
                        },
                        'properties': {
                            'icon': 'drone-icon'
                        }
                    },
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [longitude2, latitude2]
                        },
                        'properties': {
                            'icon': 'car-icon'
                        }
                    }
                ]
            };
        } catch (err) {
            throw new Error(err);
        }
    }
</script>

<div id="map"></div>

<style>
    #map { position: absolute; top: 0; bottom: 0; width: 80%; }
</style>

import React, { useRef, useEffect } from 'react';

import './Map.css'


const Map = props => {
    const mapRef = useRef();
    const center = props.marker || { lat: 46.2530695, lng: 20.1433256 };
    const zoom = 16;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });
        new window.google.maps.Marker({ position: center, map: map })
    }, [])
    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );

}

export default Map;


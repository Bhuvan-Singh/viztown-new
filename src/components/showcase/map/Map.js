import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {navigate} from 'gatsby'

export default function Map({propertyListings, propId = null}) {
    const zoom = propId === null ? 12 : 20;
    const propertyID = propId === null ? 0 : parseInt(propId)
    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    };

    const onMarkerClick = (slug) => {
        navigate(`/showcase/${slug}`)
    };

    return (
        <LoadScript
        googleMapsApiKey="AIzaSyA3DVWS2TNZJCxXKbz3OmTQnVpy1JR1WgA"
        >
            <GoogleMap
                id="vt-map"
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={propertyListings[propertyID].coordinates}
            >
                {propertyListings.map((property,index) => (
                    <Marker
                    key={index}
                    icon={"https://img.icons8.com/fluency/48/000000/marker.png"}
                    position={property.coordinates}
                    label={property.title}
                    url={`/showcase/${property.slug}/`}
                    onClick={(() => onMarkerClick(property.slug))}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    )
}

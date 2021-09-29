import React,{useContext} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {navigate} from 'gatsby'
import { ListingContext } from '../../../contexts/ListingContextProvider';

export default function Map({propId = null,details = null}) {
    const {listings} = useContext(ListingContext)
    const zoom = propId === null ? 12 : 20;
    const center = details === null ? listings[0].coordinates : details.coordinates
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
                center={center}
            >
                {listings.map((listing,index) => {
                    const icon = listing.id == propId ? "https://img.icons8.com/ultraviolet/40/000000/marker.png" : "https://img.icons8.com/offices/40/000000/marker.png";
                    return (
                    <Marker
                    key={index}
                    icon={icon}
                    position={listing.coordinates}
                    label={listing.title}
                    url={`/showcase/${listing.slug}/`}
                    onClick={(() => onMarkerClick(listing.slug))}
                    />
                    )}
                )}
            </GoogleMap>
        </LoadScript>
    )
}
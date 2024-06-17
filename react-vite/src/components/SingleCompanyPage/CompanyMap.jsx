// // import { GoogleMap, useLoadScript } from '@react-google-maps/api';
// import { getGeocode } from '../../redux/maps';
// import './SingleCompany.css';
// import './CompanyMap.css';
// import { useEffect, useCallback, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';


// function CompanyMap({ company }) {

//     const dispatch = useDispatch();
//     const mapRef = useRef(null)

//     const geocode = Object.values(useSelector(state => state.maps))

//     let lat;
//     let lng;

//     geocode.map(place => {
//         lat = place.lat
//         lng = place.lng
//     })

//     useEffect(() => {
//         const runDispatches = async () => {

//             await dispatch(getGeocode(company.address, company.city, company.state))

//         }
//         runDispatches()
//     }, [dispatch, company.address, company.city, company.state])


//     const initMap = useCallback(async () => {
//         const { Map } = await google.maps.importLibrary("maps");
//         const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//         const position = new google.maps.LatLng(lat, lng);

//         mapRef.current = new Map(document.getElementById("map"), {
//             zoom: 18,
//             center: position,
//             mapId: "DEMO_MAP_ID",
//         });

//         const marker = new AdvancedMarkerElement({
//             map: mapRef.current,
//             position: position,
//             title: `${company.name}`,
//         });
//         marker
//     }, [company.name, lat, lng])


//     useEffect(() => {
//         if (lat !== undefined && lng !== undefined) initMap();
//     }, [initMap, lat, lng])


//     return (
//         <>
//             {/* {!isLoaded ? (
//                 <h1>Loading...</h1>
//             ) : (
//                 <GoogleMap
//                     mapContainerStyle={mapStyles}
//                     zoom={20}
//                     center={defaultCenter}
//                 />
//             )} */}

//             <div id="map">
//             </div>

//         </>
//     )
// }

// export default CompanyMap

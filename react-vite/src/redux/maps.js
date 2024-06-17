const LOAD_GEOCODING = 'maps/LOAD_GEOCODING'

export const loadGeocode = (geocode) => ({
    type: LOAD_GEOCODING,
    geocode
})


export const getGeocode = () => async (dispatch) => {


    // const regex = /[^a-zA-Z0-9\s]/g;
    // const gmApiAddress = address?.replaceAll(regex, "");

    const res = await fetch(``)

    if (res.ok) {
        const geocode = await res.json();

        dispatch(loadGeocode(geocode))

    } else {
        const errors = await res.json();
        return errors;
    }
}

const mapsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_GEOCODING: {

            const geoState = {}
            action.geocode.results.forEach(geocode => {
                geoState[geocode.place_id] = geocode.geometry.location
            })

            return geoState
        }
        default:
            return { ...state }
    }
}

export default mapsReducer;

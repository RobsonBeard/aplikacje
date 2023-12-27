import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const Map = ({ route }) => {
    return (
        <MapView
            style={{ flex: 1, width: "100%", height: 100 }}
            initialRegion={{
                latitude: 50.046699,
                longitude: 19.921979,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {
                route.params.markersData.map((elem, i) => {
                    return <Marker
                        key={i}
                        coordinate={{
                            latitude: elem.latitude,
                            longitude: elem.longitude
                        }}
                    />
                })

            }
        </MapView>
    )
}

export default Map
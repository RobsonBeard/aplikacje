import { View, Switch, ActivityIndicator, Alert, Text, FlatList, Image } from "react-native"
import React, { useEffect, useState } from 'react';

import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { colors } from './settings'
import MyButton from './MyButton';


const ListItem = ({ uuid, coords, timestamp, addMarker, removeMarker }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => {
        if (previousState) {
            removeMarker(uuid)
        } else {
            addMarker(uuid)
        }

        return !previousState
    });



    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image source={require('../assets/mapka.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <View>
                <Text>Timestamp: {timestamp}</Text>
                <Text>Latitude: {coords.latitude}</Text>
                <Text>Longitude: {coords.longitude}</Text>
            </View>
            <Switch
                trackColor={{ false: colors.lightPrimary, true: colors.darkPrimary }}
                thumbColor={isEnabled ? colors.accent : colors.accent}
                onValueChange={toggleSwitch}
                value={isEnabled}
                ios_backgroundColor="#3e3e3e"
            />
        </View>
    )
}

export default ListItem
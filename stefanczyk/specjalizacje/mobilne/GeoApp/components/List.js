import { View, Switch, ActivityIndicator, Alert, FlatList } from "react-native"
import React, { useEffect, useState } from 'react';

import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { colors } from './settings'
import MyButton from './MyButton';
import ListItem from "./ListItem";



const List = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => {

        // if (previousState) {
        //     setSwitched(false)
        // } else {
        //     setSwitched(true)
        // }

        return !previousState
    }
    );


    const [isWaiting, setIsWaiting] = useState(false)

    const [positionsData, setPositionsData] = useState([])
    // const [switched, setSwitched] = useState(false)
    const [switchedData, setSwitchedData] = useState([])


    useEffect(() => {
        async function getLocation() {
            await Location.requestForegroundPermissionsAsync();
        }
        getLocation()

        async function getStorageData() {
            let keys = await AsyncStorage.getAllKeys();
            let stores = await AsyncStorage.multiGet(keys);

            let storageData = []
            for (let i = 0; i < stores.length; i++) {
                storageData[i] = [stores[i][0], JSON.parse(stores[i][1])]
            }

            setPositionsData(storageData)
        }
        getStorageData()

    }, [])

    const getPosition = async () => {
        setIsWaiting(true)
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            accuracy: Location.Accuracy.High,
        });

        Alert.alert('Pozycja', 'Pozycja została pobrana - czy zapisać?', [
            {
                text: 'TAK',
                onPress: async () => {
                    console.log('OK Pressed')

                    await AsyncStorage.setItem(`${uuid.v4()}`, JSON.stringify({
                        coords: location.coords,
                        timestamp: location.timestamp
                    }));

                    let keys = await AsyncStorage.getAllKeys();
                    let stores = await AsyncStorage.multiGet(keys);

                    let storageData = []
                    for (let i = 0; i < stores.length; i++) {
                        storageData[i] = [stores[i][0], JSON.parse(stores[i][1])]
                    }

                    setPositionsData(storageData)
                    setIsWaiting(false)
                }
            },
            {
                text: 'NIE',
                onPress: async () => {
                    console.log('Cancel Pressed')
                    setIsWaiting(false)
                },
                style: 'cancel',
            },
        ])

    }

    const deleteAllPositions = async () => {
        await AsyncStorage.clear()
        setPositionsData([])
        alert("Dane usunięte")
    }


    const addMarker = (uuid) => {
        setSwitchedData([...switchedData, uuid])
    }

    const removeMarker = (uuid) => {
        setSwitchedData(switchedData.filter((elem) => elem != uuid))
    }

    useEffect(() => {
        console.log(switchedData);
    }, [switchedData]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 10 }}>
                    <MyButton color={colors.primary} text="POBIERZ I ZAPISZ POZYCJĘ" width={170} height={80} fontSize={15} action={() => { getPosition() }} />
                    <MyButton color={colors.primary} text="USUŃ WSZYSTKIE DANE" width={170} height={80} fontSize={15} action={() => { deleteAllPositions() }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}>
                    <MyButton color={colors.primary} text="PRZEJDŹ DO MAPY" width={190} height="auto" fontSize={15} action={() => { navigation.navigate("map", { markersData: positionsData.map((elem) => elem[1].coords) }) }} />
                    <Switch
                        trackColor={{ false: colors.lightPrimary, true: colors.darkPrimary }}
                        thumbColor={isEnabled ? colors.accent : colors.accent}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        ios_backgroundColor="#3e3e3e"
                    />
                    {/* te kolory są w negatywie w trybie ciemnym */}
                </View>
            </View>

            {
                isWaiting ?
                    <View style={{ marginTop: 20 }}><ActivityIndicator size="large" color="#0000ff" /></View>
                    :
                    <FlatList
                        data={positionsData}
                        style={{ width: "100%", marginTop: 20, flex: 4 }}
                        renderItem={({ item }) => <ListItem uuid={item[0]} coords={item[1].coords} timestamp={item[1].timestamp} addMarker={addMarker} removeMarker={removeMarker} />}
                    />
            }


        </View>
    )
}

export default List
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import * as Font from "expo-font";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


import MyButton from './MyButton';


const TestMain = ({ navigation }) => {

    const [number, setNumber] = useState(1)
    const [fontLoaded, setFontLoaded] = useState(false)


    getFont = async () => {
        await Font.loadAsync({
            'myfont': require("../components/gothammedium.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
    }

    useEffect(() => {
        // Czcionka tylko na głównym ekranie
        getFont().then(() => setFontLoaded(true)) // chyba tylko tak działa
    }, []);

    // -----

    getPosition = async () => {
        // let pos = await Location.getCurrentPositionAsync({})
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            accuracy: Location.Accuracy.High,
        });
        alert(JSON.stringify(location, null, 4))
    }

    useEffect(() => {
        async function getLocation () {
            await Location.requestForegroundPermissionsAsync();
        }
        getLocation()

        // getPosition() // albo to poza tą funkcją
    }, [])



    setData = async () => {
        // await AsyncStorage.setItem('key1', 'value1');
        await AsyncStorage.setItem('key' + Math.round(Math.random() * 100), 'value' + Math.random());
    }

    getData = async () => {
        let val = await AsyncStorage.getItem('key1');
        console.log(val);
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        console.log("keys", keys)
        let stores = await AsyncStorage.multiGet(keys);
        console.log("stores", stores)
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            console.log(key, value)
        });
    } // biblioteka się często zmienia


    // Async Storage can only store string data.In order to store object data, you need to serialize it first.For data that can be serialized to JSON, you can use JSON.stringify() when saving the data and JSON.parse() when loading the data.


    // jako klucz
    // uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'



    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 15 }}>
            <View >
                {
                    number == 0 ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <ActivityIndicator size="small" color="#ff0000" />
                }
            </View>
            <View >
                {
                    fontLoaded ?
                        <Text style={{ fontSize: 30, fontFamily: "myfont" }}>Przykladowy tekst z nowym fontem</Text>
                        :
                        null
                }
            </View>
            <MyButton color="blue" text="Get Position" width={150} height={50} fontSize={20} action={getPosition} />
            <MyButton color="blue" text="Zapis" width={150} height={50} fontSize={20} action={setData} />
            <MyButton color="blue" text="Odczyt" width={150} height={50} fontSize={20} action={getData} />
            <MyButton color="blue" text="Odczyt wielu danych" width={150} height={80} fontSize={20} action={getAllData} />
            <MapView
                style={{ flex: 1, width: "100%", height: 100 }}
                initialRegion={{
                    latitude: 50.0577,
                    longitude: 19.959,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 50.0577,
                        longitude: 19.959,
                    }}
                    title={"pos"}
                    description={"opis"}
                />
            </MapView>

        </View>

    )
}

// const styles = StyleSheet.create({

// })


export default TestMain
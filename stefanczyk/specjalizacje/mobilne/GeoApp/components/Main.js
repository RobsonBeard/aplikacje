import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from "expo-font";

import { colors } from './settings'
import MyButton from './MyButton';


const Main = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false)

    getFont = async () => {
        await Font.loadAsync({
            'myfont': require("../components/gothammedium.ttf"),
        });
    }

    useEffect(() => {
        getFont().then(() => setFontLoaded(true))
    }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center"
        },
        text: {
            fontSize: 18,
            fontFamily: "myfont",
            textAlign: "center",
            color: colors.textAndIcons
        }

    })

    return (
        <View style={styles.container}>
            {
                fontLoaded ?
                    <View style={{ gap: 20 }}>
                        <MyButton color={colors.primary} text="Geo App" width="100vw" height="auto" fontSize={60} action={() => { navigation.navigate("list") }} fontFamily="myfont" />
                        <Text style={styles.text}>find and save your position using google maps</Text>
                    </View>
                    :
                    <Text>font is not loaded</Text>
            }
        </View>
    )
}


export default Main
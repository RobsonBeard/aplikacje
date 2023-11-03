import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';

const Screen2 = ({ route, navigation }) => {
    console.log(route);
    return (
        <View>
            <StatusBar />
            <Button title='go to screen1' onPress={() => { navigation.navigate('s1') }}></Button>
            <Button title='go to main' onPress={() => { navigation.navigate('main') }}></Button>
            <Text>{JSON.stringify(route, null, 3)}</Text>
        </View>
    )
}

export default Screen2
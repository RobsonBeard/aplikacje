import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Screen1 = ({ navigation }) => {

    return (
        <View>
            <Button title='go to screen2' onPress={() => { navigation.navigate('s2', { a: 1, b: 2 }) }}></Button>
            <Button title='go to main' onPress={() => { navigation.navigate('main') }}></Button>
        </View>
    )
}

export default Screen1
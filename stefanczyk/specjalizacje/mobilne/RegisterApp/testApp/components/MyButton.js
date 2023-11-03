import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const MyButton = ({ color, text, width, height, fontSize, action }) => {

    const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: color,
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
        },
        buttonText: {
            fontSize: fontSize
        }
    })

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => action()}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}


export default MyButton
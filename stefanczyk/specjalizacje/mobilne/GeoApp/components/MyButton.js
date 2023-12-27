import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from './settings';

const MyButton = ({ color, text, width, height, fontSize, action, fontFamily }) => {

    const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: color,
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
        },
        buttonText: {
            fontSize: fontSize,
            textAlign: "center",
            color: colors.textAndIcons
        },
        buttonText2: {
            fontSize: fontSize,
            fontFamily: fontFamily,
            textAlign: "center",
            color: colors.textAndIcons
        }
    })

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => action()}>
            {
                fontFamily ?
                    <Text style={styles.buttonText2}>{text}</Text>
                    :
                    <Text style={styles.buttonText}>{text}</Text>
            }
        </TouchableOpacity>
    )
}


export default MyButton
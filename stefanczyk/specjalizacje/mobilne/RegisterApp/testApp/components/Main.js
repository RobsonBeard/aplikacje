import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import MyButton from './MyButton';
import { colors, IP, PORT } from './settings'


const Main = ({ navigation }) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const register = async (login, password) => {
        try {
            if (login === "" || password === "") throw "All the fields must not be empty"

            const options = {
                method: 'POST',
                body: JSON.stringify({ login: login, password: password }),
                headers: { 'Content-Type': 'application/json' }
            }

            const response = await fetch(`http://${IP}:${PORT}/register`, options)
            if (!response.ok) {
                console.log(response.status);
            } else {
                const result = await response.json()

                if (result.status) {
                    navigation.navigate('users')
                } else {
                    alert(result.info)
                }

            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.registerHeader}>
                <Text style={styles.headerText}>Register App</Text>
            </View>
            <View style={styles.registerWindow}>
                <Text style={{ fontSize: 20, color: colors.secondaryText }} >Welcome in the app!</Text>
                <TextInput
                    style={styles.inputs}
                    placeholder='Login'
                    onChangeText={newText => setLogin(newText)}
                    defaultValue={login}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder='Password'
                    onChangeText={newText => setPassword(newText)}
                    defaultValue={password}
                />
                <MyButton color={colors.primary} text={"Register"} width={100} height={50} fontSize={20} action={() => register(login, password)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputs: {
        height: 80,
        width: 200,
        fontSize: 20
    },
    headerText: {
        fontSize: 40
    },
    registerHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    registerWindow: {
        flex: 1, alignItems: 'center', gap: 20, padding: 20
    }
})


export default Main
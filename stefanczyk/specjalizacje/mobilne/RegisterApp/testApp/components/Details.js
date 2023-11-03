import { View, Text, Image, StyleSheet } from 'react-native';

import { colors } from './settings'

const Details = ({ route }) => {
    const params = route.params
    return (
        <View style={styles.mainContainer}>
            <Image source={require("../assets/userAvatar.png")} style={{ height: 120, width: 120, borderRadius: 60 }} />
            <View style={styles.subContainer}>
                <Text style={styles.secondaryText}>Login:</Text>
                <Text style={styles.primaryText}>{params.login}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.secondaryText}>Password:</Text>
                <Text style={styles.primaryText}>{params.password}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.secondaryText}>Registered: </Text>
                <Text style={styles.primaryText}>{params.date}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        gap: 15,
        margin: "30%"
    },
    subContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    primaryText: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 25
    },
    secondaryText: {
        color: colors.secondaryText,
        fontSize: 20
    }
})


export default Details
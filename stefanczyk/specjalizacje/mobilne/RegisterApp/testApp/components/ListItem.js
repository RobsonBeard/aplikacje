import { View, Text, Image } from 'react-native';

import { colors } from './settings'

import MyButton from './MyButton';

const ListItem = ({ id, login, navigation, password, date, deleteUser }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", gap: 10, marginTop: 30 }}>
            <View style={{ flex: 3, flexDirection: "row", gap: 40 }}>
                <View>
                    <Image source={require("../assets/userAvatar.png")} style={{ height: 60, width: 60, borderRadius: 50 }} />
                </View>
                <View>
                    <View style={{ flex: 1, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}>
                        <MyButton color={colors.primary} text={"DETAILS"} height={30} width={100} action={() => { navigation.navigate('details', { login: login, password: password, date: date }) }} />
                        <MyButton color={colors.primary} text={"DELETE"} height={30} width={100} action={() => { deleteUser(id) }} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text>{id}: {login}</Text>
            </View>
        </View>
    )
}
export default ListItem
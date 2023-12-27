import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

import Item from './components/Item02';



const App = ({
}) => (
    <View style={styles.container}>
        <StatusBar></StatusBar>
        <Item color="red" name="Header" fontSize="30px"></Item>
        <Item color="green" name="Content" fontSize="30px"></Item>
        <Item color="blue" name="Footer" fontSize="30px"></Item>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffff00',
    },

});

export default App;

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

//! rncsl

// import React from 'react';
// import { Text, View } from 'react-native';

// const App01 = ({
//     params,
// }) => (
//     <View>
//         <Text>App01</Text>
//     </View>
// );

// export default App01;


import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

export default class App extends React.Component {
    render() {
        console.log("App") // tę konsolę zobacz w przeglądarce
        return (
            <View style={styles.container}>
                <StatusBar></StatusBar>
                <Header />
                <Content />
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffff00',
    },

});
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

// import TestMain from './components/TestMain';

import Main from './components/Main';
import List from './components/List';
import Map from './components/Map';
import { colors } from "./components/settings"
import TestMain from './components/TestMain';

const Stack = createNativeStackNavigator();

function App () {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="list"
          component={List}
          options={{
            title: 'Zapis pozycji',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.textAndIcons,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen
          name="map"
          component={Map}
          options={{
            title: 'Lokalizacja na mapie',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.textAndIcons,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

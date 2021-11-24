import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from './screens/LoadingScreen';
import MainScreen from './screens/MainScreen';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {colors} from './Utils';

const Stack = createNativeStackNavigator();

const App = () => {
  const barColor = async () => {
    try {
      const response = await changeNavigationBarColor(colors.primary, false);
    } catch (e) {}
  };
  React.useEffect(() => {
    barColor();
  }, []);
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />

          <Stack.Screen
            options={{animation: 'slide_from_right'}}
            name="MainScreen"
            component={MainScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

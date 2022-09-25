import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Toast from 'react-native-toast-message';

import Tabs from './routes/tabs';
import BookDetail from './screens/bookDetails/bookDetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Tabs}
          />

          <Stack.Screen
            name="BookDetail"
            options={({ route }) => ({ title: route.params.title })}
            component={BookDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;

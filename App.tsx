
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Content from './src/content';
import UserInfo from './src/userInfo';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Content" screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Content" component={Content} options={{ headerShown: false }} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

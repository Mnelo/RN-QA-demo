
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/page/login';
import VerifyCode from '@/page/login/verifycode';
import Content from '@/page/content';
import UserInfo from '@/page/userInfo';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="VerifyCode"
          component={VerifyCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Content" component={Content} options={{ headerShown: false }} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

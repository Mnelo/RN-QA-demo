
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Loading from '@/page/loading';
import Login from '@/page/login';
import VerifyCode from '@/page/login/verifycode';
import Content from '@/page/content';
import UserInfo from '@/page/userInfo';
import CameraBox from '@/page/content/camera';
import QrCode from '@/page/content/qrcode';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="loading" screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen
            name="VerifyCode"
            component={VerifyCode}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Content" component={Content} options={{ headerShown: false }} />
          <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerShown: false }} />
          <Stack.Screen name="CameraBox" component={CameraBox} options={{ headerShown: false }} />
          <Stack.Screen name="QrCode" component={QrCode} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
};

export default App;


import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerLayoutAndroid } from 'react-native';
import Content from './src/content';
import UserInfo from './src/userInfo';
import Menu from './src/menu';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  const drawer = useRef<any>(null);

  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          drawerPosition="left"
          renderNavigationView={() => <Menu drawer={drawer} />}
        >
          <Stack.Navigator initialRouteName="Content" screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="Content" component={Content} options={{ headerShown: false }} initialParams={{ drawer }} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
          </Stack.Navigator>
        </DrawerLayoutAndroid>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;

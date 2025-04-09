import React from 'react';
import { View } from 'react-native';
import Menu from './menu';
import QA from './qa';
import Header from './header';
import { createDrawerNavigator } from '@react-navigation/drawer';

const LeftDrawer = createDrawerNavigator();

const Home = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <QA />
        </View>
    );
};

const Content = (): React.JSX.Element => {
    return (
        <LeftDrawer.Navigator
            id={'LeftDrawer' as unknown as undefined}
            drawerContent={Menu}
            screenOptions={{
                drawerStyle: {
                    width: 300,
                },
                drawerPosition: 'left',
                swipeEdgeWidth: 300, // 全屏触发区域
                drawerType: 'slide', // 滑动动画类型
            }}
        >
            <LeftDrawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </LeftDrawer.Navigator>
    );
};


export default Content;

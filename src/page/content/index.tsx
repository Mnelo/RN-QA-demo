import React, { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Menu from './menu';
import QA from './qa';
import Header from './header';
import { Drawer } from '@ant-design/react-native';

const Content = (): React.JSX.Element => {
    const [drawer, setDrawer] = useState(null);

    return (
        <GestureHandlerRootView>
            <View style={{ flex: 1 }}>
                <Drawer
                    sidebar={<Menu />}
                    position="left"
                    open={false}
                    drawerRef={(el: any) => setDrawer(el)}
                    drawerBackgroundColor="white"
                >
                    <View style={{ flex: 1 }}>
                        <Header drawer={drawer} />
                        <QA />
                    </View>
                </Drawer>
            </View>
        </GestureHandlerRootView>


    );
};


export default Content;

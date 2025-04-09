import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Menu from './menu';
import QA from './qa';
import Header from './header';
import { Drawer } from '@ant-design/react-native';

const Content = (): React.JSX.Element => {
    const [drawer, setDrawer] = useState<any>(null);

    const gestureHandler = useCallback((event: any) => {
        if (event.translationX > 150 && !drawer.drawerShown) {
            drawer.openDrawer();
        }
    }, [drawer]);

    const panGesture = Gesture.Pan()
        .onUpdate(gestureHandler);
    // .onEnd();


    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={panGesture}>
                <View style={{ flex: 1 }} >
                    <Drawer
                        sidebar={<Menu />}
                        position="left"
                        open={false}
                        drawerRef={(el: any) =>
                            setDrawer(el)
                        }
                        drawerBackgroundColor="white"
                    >
                        <View style={{ flex: 1 }}>
                            <Header drawer={drawer} />
                            <QA />
                        </View>
                    </Drawer>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};


export default Content;

import React from 'react';
import { View } from 'react-native';
import QA from './qa';
import Header from './header';
// import { Drawer, Button, Text } from '@ant-design/react-native';

// let test: any;
const Content = (props: any): React.JSX.Element => {
    const { drawer } = props?.route?.params;

    // const sidebar = (
    //     <View style={{ flex: 1 }}>
    //         <Text>123456</Text>
    //     </View>
    // );

    return (
        <View style={{ flex: 1 }}>
            {/* <Drawer
                sidebar={sidebar}
                position="left"
                open={false}
                drawerRef={(el: any) => (test = el)}
                drawerBackgroundColor="#ccc"
            >
                <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
                    <Button onPress={() => {
                        test.openDrawer();
                    }}>
                        Open drawer
                    </Button>
                </View>
            </Drawer> */}

            <Header drawer={drawer} />
            <QA />
        </View>

    );
};


export default Content;

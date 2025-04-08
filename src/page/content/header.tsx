import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';

const Header = (props: any): React.JSX.Element => {
    const { drawer } = props;
    const navigation: any = useNavigation();

    return (
        <View>
            <View style={[styles.container]}>
                <Icon
                    style={[styles.button]}
                    name="bars"
                    onPress={() => {
                        drawer.openDrawer();
                    }}
                />

                <Text style={[styles.textName]}>AI问答</Text>

                <Icon
                    style={[styles.camera]}
                    name="scan"
                    onPress={() => {
                        navigation.navigate('CameraBox');
                    }}
                />
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 20,
        height: 30,
    },
    button: {
        width: 20,
        marginLeft: '4%',
        color: 'black',
    },
    textName: {
        width: 60,
        fontWeight: 600,
    },
    camera: {
        width: 20,
        marginRight: '4%',
        color: 'black',
    },
});


export default Header;

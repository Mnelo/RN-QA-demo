import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from '@ant-design/react-native';

const Header = (props: any): React.JSX.Element => {
    const { drawer } = props;

    return (
        <View style={[styles.container]}>
            <Icon
                style={[styles.button]}
                name="bars"
                onPress={() => {
                    drawer.openDrawer();
                }}
            />

            <Text style={[styles.textName]}>AI问答</Text>

            <Text />
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
});


export default Header;

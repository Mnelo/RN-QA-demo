import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = (props: any) => {
    const { drawer } = props;
    const navigation: any = useNavigation();

    return (
        <View style={[styles.drawer]}>
            <Text style={{ margin: 10, fontSize: 15 }}>I'm in the Drawer!</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    drawer?.current?.closeDrawer();
                    navigation.navigate('UserInfo');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
        padding: 8,
    },
});

export default Menu;

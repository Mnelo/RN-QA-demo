import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@ant-design/react-native';

const Menu = () => {
    const navigation: any = useNavigation();

    return (
        <View style={[styles.drawer]}>
            <ScrollView style={[styles.content]}>
                <Text style={{ fontSize: 15 }}>I'm in the Drawer!</Text>
            </ScrollView>


            <View style={[styles.userInfo]}>
                <View style={[styles.imageBox]}>
                    <Text style={{ textAlign: 'center', lineHeight: 28 }}>唔</Text>
                </View>

                <View>
                    <Icon
                        style={[styles.config]}
                        name="setting"
                        onPress={() => {
                            navigation.navigate('UserInfo');
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingTop: '20%',
    },
    content: {
        height: '92%',
        paddingHorizontal: '5%',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: '8%',
        minHeight: 40,
        paddingTop: '6%',
        paddingHorizontal: '10%',
    },
    imageBox: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    config: {
        width: 20,
        color: 'black',
    },
});

export default Menu;

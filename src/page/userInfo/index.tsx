import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import { Icon } from '@ant-design/react-native';

const UserInfo = (): React.JSX.Element => {
    const navigation: any = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    const loginOut = async (): Promise<any> => {
        await Keychain.resetGenericPassword({ service: 'rn-qa' });

        navigation.navigate('login');

    };

    return (
        <View style={styles.info}>
            <View style={styles.head}>
                <Icon name="arrow-left" style={styles.icon} color="black" size={24} onPress={goBack} />
                <Text style={styles.name}>设置</Text>
                <View />
            </View>

            <View style={styles.content}>
                <Button style={styles.loginout} onPress={loginOut}>退出登录</Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        flex: 1,
        alignItems: 'center',
    },
    head: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginTop: 36,
        marginLeft: 20,
    },
    name: {
        marginTop: 36,
        marginRight: 40,
        fontSize: 20,
    },
    content: {
        width: '100%',
        padding: '4%',
    },
    loginout: {
        width: '100%',
    },
});


export default UserInfo;

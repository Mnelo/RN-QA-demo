import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';

const UserInfo = (): React.JSX.Element => {
    const navigation: any = useNavigation();

    const loginOut = async (): Promise<any> => {
        await Keychain.resetGenericPassword({ service: 'rn-qa' });

        navigation.navigate('login');

    };

    return (
        <View style={styles.info}>
            <Button style={styles.loginout} onPress={loginOut}>退出登录</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        flex: 1,
        alignItems: 'center',
        padding: '4%',
    },
    loginout: {
        width: '100%',
    },
});


export default UserInfo;

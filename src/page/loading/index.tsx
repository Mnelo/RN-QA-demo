import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Image, Easing } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import Api from '@/services/index';
import loadingImage from '@/assets/loading.png';

const Loading = (): React.JSX.Element => {
    const rotateValue = useRef(new Animated.Value(0)).current;
    const navigation: any = useNavigation();

    useFocusEffect(React.useCallback(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1500, // 旋转一圈的时间
                useNativeDriver: true, // 原生驱动提升性能
                easing: Easing.linear, // 匀速运动
            })
        ).start();

        getCredentials();
    }, []));

    const interpolateRotation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const getCredentials = async (): Promise<any> => {
        const credentials: any = await Keychain.getGenericPassword({ service: 'rn-qa' });

        try {
            const res = await Api.getInfo(credentials.username);

            // 新设备登录后，useid将会重新生成，已登录的设备回退到登录页，userid作为登录唯一凭证
            if (credentials && res.data && credentials.password === res.data.userid) {
                navigation.replace('Content');

                return;
            }

            navigation.replace('login');
        } catch (err) {
            // 无网络时，登录过的设备跳转到内容页
            if (credentials.password) {
                navigation.replace('Content');

                return;
            }

            navigation.replace('login');
        }
    };

    return (
        <View style={styles.box}>
            <Animated.View style={{ transform: [{ rotate: interpolateRotation }] }}>
                <Image source={loadingImage} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loading;

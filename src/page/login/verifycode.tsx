/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Input } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '@/services/index';

const VerifyCode = (): React.JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState<any>(undefined);
    const navigation: any = useNavigation();

    useEffect(() => {
        if (number && number.length === 4) {
            send(number);
        }

    }, [number]);

    const send = async (number: string): Promise<any> => {
        if (loading) {
            return;
        };

        setLoading(true);

        // const res = await Api.getCode({ number });

        const res = await Api.createUser({ number });

        setLoading(false);

        console.log(res);
    };

    return (
        <View>
            <Icon
                name="arrow-left"
                style={styles.back}
                onPress={() => {
                    navigation.goBack();
                }}
            />

            <Text style={styles.tip}>请输入验证码</Text>

            <Input
                style={styles.input}
                textAlign="center"
                value={number}
                type='number'
                maxLength={4}
                onChange={(e: any) => {
                    const number = e.target.value;
                    setNumber(number.toString().length > 4 ? number.substring(0, 4) : number);
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    back: {
        color: 'black',
        marginTop: 30,
        marginBottom: 20,
        marginHorizontal: '4%',
    },
    tip: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: '35%',
    },
    input: {
        alignSelf: 'center',
        width: '92%',
        height: 40,
        backgroundColor: 'rgba(199,199,199,0.3)',
        borderRadius: 10,
        lineHeight: 30,
        marginTop: 20,
    },
});


export default VerifyCode;

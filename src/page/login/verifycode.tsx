import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Input, Toast, Provider } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '@/services/index';
import { useStore } from '@/mobx/useStore';
import * as Keychain from 'react-native-keychain';

const VerifyCode = (): React.JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState<any>(undefined);
    const navigation: any = useNavigation();
    const PhoneStore = useStore('PhoneStore');

    useEffect(() => {
        if (number && number.length === 4) {
            send(number);
        }
    }, [number]);

    const send = async (code: string): Promise<any> => {
        if (loading) {
            return;
        }

        setLoading(true);

        const res = await Api.createUser({ phone: PhoneStore.phone, code });

        setLoading(false);

        if (res.status === 200 && res.error) {
            Toast.fail({
                content: res.error,
                position: 'center',
            });
        }

        if (res.status === 200) {
            await Keychain.setGenericPassword(res.data.phone, res.data.userid, { service: 'rn-qa' });
            navigation.replace('Content');
        }
    };

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <Icon
                    name="arrow-left"
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />

                <Text style={styles.tip}>请输入验证码</Text>

                <Input
                    inputStyle={styles.input}
                    textAlign="center"
                    value={number}
                    type="number"
                    maxLength={4}
                    onChange={(e: any) => {
                        const code = e.target.value;
                        setNumber(code.toString().length > 4 ? code.substring(0, 4) : code);
                    }} />
            </View>
        </Provider>
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
        marginHorizontal: '4%',
        height: 50,
        borderBottomColor: 'rgba(199,199,199,0.3)',
        borderBottomWidth: 2,
        borderRadius: 10,
        lineHeight: 30,
        marginTop: 20,
    },
});


export default observer(VerifyCode);

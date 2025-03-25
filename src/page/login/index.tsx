import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';
import { Form, Input, Button } from '@ant-design/react-native';
import Api from '@/services/index';
import { useStore } from '@/mobx/useStore';

const Login = (): React.JSX.Element => {
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();
    const [form] = Form.useForm();
    const phone = Form.useWatch('phone', form);
    const PhoneStore = useStore('PhoneStore');

    const onSubmit = () => {
        form.submit();
    };

    const onFinish = async (values: any): Promise<any> => {
        //mobx保存手机号
        PhoneStore.set(values.phone);

        setLoading(true);

        await Api.getCode({ phone: values.phone });

        setLoading(false);

        navigation.navigate('VerifyCode');
    };

    return (
        <View style={styles.box}>
            <Text style={styles.name}>手机号登录</Text>
            <Form
                name="basic"
                form={form}
                layout="vertical"
                style={[styles.transparent, { padding: '6%' }]}
                onFinish={onFinish}
            >
                <Form.Item
                    name="phone"
                    style={[styles.transparent, { height: 60 }]}
                    validateFirst={true}
                >
                    <Input
                        type="number"
                        inputStyle={styles.input}
                        maxLength={11}
                        placeholder="请输入手机号"
                        onChange={(e: any) => {
                            if (e.target.value.length > 11) {
                                form.setFieldValue('phone', e.target.value.substring(0, 11));
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item style={[styles.transparent, { height: 80 }]}>
                    <Button
                        type={phone?.toString()?.length === 11 ? 'primary' : undefined}
                        style={styles.next}
                        disabled={phone?.toString()?.length !== 11}
                        onPress={onSubmit}
                        loading={loading}
                    >
                        {loading ? '' : '下一步'}
                    </Button>
                </Form.Item>
            </Form>
        </View >
    );
};

const styles = StyleSheet.create({
    transparent: {
        backgroundColor: 'transparent',
    },
    box: {
        flex: 1,
        paddingVertical: '50%',
    },
    name: {
        alignSelf: 'center',
        fontSize: 20,
    },
    input: {
        paddingLeft: '4%',
        height: 80,
        backgroundColor: 'rgba(199,199,199,0.3)',
        borderRadius: 10,
        lineHeight: 30,
    },
    next: {
        borderRadius: 10,
    },
});


export default observer(Login);

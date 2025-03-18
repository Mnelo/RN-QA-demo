import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';
import { Form, Input, Button } from '@ant-design/react-native';
import Api from '@/services/index';

const Login = (): React.JSX.Element => {
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();
    const [form] = Form.useForm();
    const number = Form.useWatch('number', form);

    const onSubmit = () => {
        form.submit();
    };

    const onFinish = async (values: any): Promise<any> => {
        setLoading(true);

        const res = await Api.login(values);

        setLoading(false);

        if (res?.status === 200 && res?.data?.userid) {
            navigation.navigate('Content');
            return;
        }

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
                    name="number"
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
                                form.setFieldValue('number', e.target.value.substring(0, 11));
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item style={[styles.transparent, { height: 80 }]}>
                    <Button
                        type={number?.toString()?.length === 11 ? 'primary' : undefined}
                        style={styles.next}
                        disabled={number?.toString()?.length !== 11}
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


export default Login;

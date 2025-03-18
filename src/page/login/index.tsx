import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Form, Input, Button } from '@ant-design/react-native';

const Login = (): React.JSX.Element => {
    const [form] = Form.useForm();
    const number = Form.useWatch('number', form);

    const onSubmit = () => {
        form.submit();
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                        style={styles.input}
                        maxLength={11}
                        placeholder="请输入手机号"
                        onChange={(e: any) => {
                            if (e.target.value.length > 11) {
                                form.setFieldValue('number', e.target.value.substring(0, 11));
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item style={styles.transparent}>
                    <Button
                        type={number?.toString()?.length === 11 ? 'primary' : undefined}
                        style={styles.next}
                        disabled={number?.toString()?.length !== 11}
                        onPress={onSubmit}>
                        登录
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
        height: 40,
        backgroundColor: 'rgba(199,199,199,0.3)',
        borderRadius: 10,
    },
    next: {
        borderRadius: 10,
    },
});


export default Login;

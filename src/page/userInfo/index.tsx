import React, { useEffect } from 'react';
import { View } from '@ant-design/react-native';
import Api from '@/services/index';

const UserInfo = (): React.JSX.Element => {
    useEffect(() => {
        getList();
    }, []);

    const getList = async (): Promise<any> => {
        const res = await Api.getInfo();
        console.log(res);
    };


    return (
        <View>UserInfo</View>
    );
};

export default UserInfo;

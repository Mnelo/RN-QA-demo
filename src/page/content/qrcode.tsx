import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QrCode = ({ route }: any): React.JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={[styles.content]}>{route?.params?.codes?.[0]?.value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginVertical: 60,
        marginHorizontal: 20,
    },
});
export default QrCode;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Linking } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { Icon } from '@ant-design/react-native';
import Api from '@/services/index';

const SCAN_FRAME_SIZE = 300; // 扫描框尺寸

const CameraBox = (): React.JSX.Element => {
    const device: any = useCameraDevice('back');
    const camera: any = React.useRef(null);
    const { hasPermission, requestPermission } = useCameraPermission();
    const [isActive, setIsActive] = useState(true);
    const scanLineAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    useEffect(() => {
        Animated.loop(
            Animated.timing(scanLineAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const scanLineTranslateY = scanLineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, SCAN_FRAME_SIZE - 2], // 从顶部移动到底部
    });

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes: any) => {
            if (!isActive) {
                return;
            }

            Linking.openURL(codes[0].value);

            setIsActive(false);
        },
    });

    const pickImage = async () => {
        const options: any = {
            mediaType: 'photo',
            // includeBase64: true,  // 启用以获取Base64数据
            quality: 0.5,        // 压缩质量（提高识别率）
            maxWidth: 400,       // 限制图片宽度
            maxHeight: 400,      // 限制图片高度
        };

        const res: any = await launchImageLibrary(options);
        const { uri, type, fileName } = res.assets[0];

        const formData = new FormData();

        formData.append('file', { uri, type, name: fileName });

        deCodeImage(formData);
    };

    const deCodeImage = async (data: FormData) => {
        try {
            const res = await Api.qrCode(data);

            if (res && res.status === 200) {
                Linking.openURL(res.data.result);
            }
        } catch (err) {
            console.log(err);
        }

    };

    if (device == null) {
        return <Text>设备未找到</Text>;
    }


    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={camera}
                style={{ flex: 1 }}
                device={device}
                isActive={isActive}
                codeScanner={codeScanner}
                photo={true}
            />

            <Animated.View
                style={[
                    styles.scanLineContainer,
                    {
                        transform: [{ translateY: scanLineTranslateY }],
                    },
                ]}
            >
                <LinearGradient
                    colors={['#00FF00', 'transparent']} // 透明→绿→透明
                    start={{ x: 0, y: 0 }}   // 渐变起点（左上角）
                    end={{ x: 0, y: 1 }}     // 渐变终点（垂直向下）
                    style={styles.scanLine}
                />
            </Animated.View>

            <View style={[styles.bottomPicture]}>
                <View style={[styles.pictureBox]}>
                    <Icon style={[styles.picture]} name="picture" onPress={pickImage} />
                </View>
                <Text style={[styles.text]}>相册</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scanLineContainer: {
        position: 'absolute',
        width: '80%',
        height: 40, // 控制渐变区域高度
        marginHorizontal: '10%',
        top: '25%',
    },
    scanLine: {
        flex: 1,
        opacity: 0.8, // 适当透明度
    },
    bottomPicture: {
        width: '100%',
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    pictureBox: {
        width: 60,
        height: 60,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '50%',
    },
    picture: {
        fontSize: 30,
    },
    text: {
        color: 'white',
    },
});

export default CameraBox;

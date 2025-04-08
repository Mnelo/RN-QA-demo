import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, StatusBar, useColorScheme, View, Animated, Keyboard, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Input, Button, Icon, Toast, Provider } from '@ant-design/react-native';
import EventSource from 'react-native-sse';
import Markdown from 'react-native-simple-markdown';
import { type List } from './qa.d';
import apiService from '@/utils/axios-http';

const QA = (): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';
    const [word, setWord] = useState('');
    const [list, setList] = useState<List[]>([]);
    const [qamessage, setQamessage] = useState('');
    const [isDone, setIsDone] = useState(true);
    const [inputHeight, setInputHeight] = useState(45);
    const [boothHeight, setBoothHeight] = useState(100);
    const bottomPosition = useRef(new Animated.Value(0));
    const scrollViewRef = useRef<any>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setBoothHeight(100 + e.endCoordinates.height);
                animateBottom(-(e.endCoordinates.height));
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setBoothHeight(100);
                reset();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const animateBottom = (toValue: number): void => {
        Animated.timing(bottomPosition.current, {
            toValue, // 目标位置
            duration: 250, // 动画持续时间，单位毫秒
            useNativeDriver: true, // 如果可能，使用原生驱动以提高性能
        }).start(); // 开始动画
    };

    const reset = (): void => {
        Animated.timing(bottomPosition.current, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();

        setInputHeight(45);
    };

    const onPress = (): void => {
        if (!word) {
            Toast.show({
                content: '请输入内容',
                position: 'center',
            });

            return;
        }

        setList((pre: List[]) => ([...pre, { type: 'user', data: word }]));

        setWord('');
        setIsDone(false);

        const es = new EventSource(`${apiService.baseURL}/api/v1/deepseek`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: word }),
            method: 'POST',
        });

        // es.addEventListener('open', () => {
        //     console.log('Open SSE connection.');
        // });

        let newMessage = '';

        es.addEventListener('message', (e: any) => {
            const res = JSON.parse(e.data);
            newMessage += res.content;

            setQamessage((pre) => (pre + res.content));

            if (res.done) {
                es.close();
                setIsDone(true);

                setList((pre: List[]) => ([...pre, { type: 'ai', data: newMessage }]));

                setQamessage('');
            }

            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: false });
            }, 50);
        });

        es.addEventListener('error', () => {
            es.close();
        });

        // es.addEventListener('close', () => {
        //     console.log('Close SSE connection.');
        // });
    };

    const styles = StyleSheet.create({
        box: {
            flex: 1,
            position: 'relative',
        },
        content: {
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginTop: 0,
        },
        booth: {
            height: boothHeight,
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            borderBottomWidth: 20,
            borderBottomColor: 'white',
        },
        inputBox: {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: '4%',
            paddingVertical: 12,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
            transform: [{ translateY: bottomPosition.current }], // 通过平移实现动画
            left: 0,
            right: 0,
        },
        input: {
            width: '80%',
            height: '100%',
            borderWidth: 2,
            borderRadius: 20,
        },
        button: {
            width: '18%',
            backgroundColor: 'rgba(243,244,246,1)',
            marginLeft: '2%',
        },
        icon: {
            color: 'rgba(156,163,175,1)',
        },
        userInput: {
            marginTop: 20,
            backgroundColor: 'rgba(59, 136, 246, 1)',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            color: 'white',
            padding: 8,
            maxWidth: '70%',
            alignSelf: 'flex-end',
            right: 20,
        },
        aiInput: {
            marginTop: 20,
            backgroundColor: 'white',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            color: 'black',
            padding: 8,
            maxWidth: '70%',
            alignSelf: 'flex-start',
            left: 20,
        },
    });

    const onContentSizeChange = (_contentWidth: number, contentHeight: number) => {
        contentHeight > 100 ? setInputHeight(100) : setInputHeight(contentHeight);
    };

    return (
        <Provider>
            <View style={styles.box}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter } as any}
                />

                <ScrollView style={styles.content} ref={scrollViewRef}>
                    <View style={{ flexDirection: 'column', direction: 'ltr' }}>
                        {list?.map((item: any, index: number) =>
                            <View key={index.toString()}>
                                {
                                    item.type === 'user' ?
                                        <Text style={[styles.userInput]}>
                                            {item.data}
                                        </Text> : <Text style={[styles.aiInput]}>
                                            <Markdown>{item.data}</Markdown>
                                        </Text>
                                }
                            </View>
                        )}

                        {isDone ? null : <View>
                            <Text style={[styles.aiInput]}>
                                <Markdown>{qamessage}</Markdown>
                            </Text>
                        </View>}
                    </View>
                </ScrollView>

                <View style={[styles.booth]} />

                <Animated.View style={[styles.inputBox]}>
                    <Input.TextArea
                        style={styles.input}
                        inputStyle={{ height: inputHeight, paddingHorizontal: 12 }}
                        value={word}
                        onChange={(e: any) => {
                            setWord(e.target.value);
                        }}
                        onContentSizeChange={(e) => onContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)}
                    />
                    <Button style={styles.button} onPress={onPress}>
                        <Icon name="send" style={styles.icon} />
                    </Button>
                </Animated.View>
            </View>
        </Provider>
    );
};

export default QA;

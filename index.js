import './gesture-handler';
import 'react-native-gesture-handler'; // 必须首行导入

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

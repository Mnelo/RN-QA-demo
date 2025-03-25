import { createContext } from 'react';
import { PhoneStore } from './store';

// 利用createContext 创建storeContext
export const storeContext = createContext({
    // new 多个store
    PhoneStore: new PhoneStore(),
});

import { useContext } from 'react';
import { storeContext } from './storeContext';

export const useStore = (name: string): any => useContext<any>(storeContext)[name];

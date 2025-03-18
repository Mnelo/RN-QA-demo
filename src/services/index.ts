import apiService from '@/utils/axios-http';

const base = '/api/v1';


const login = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/mobileuser/login`, data);

const getCode = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/sms/send`, data);

const createUser = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/mobileuser/create`, data);

const getInfo = async (): Promise<any> => await apiService.axiosGet(`${base}/info`);

export default { login, getCode, createUser, getInfo };

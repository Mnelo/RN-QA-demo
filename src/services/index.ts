import apiService from '@/utils/axios-http';

const base = '/api/v1';

const getCode = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/sms/send`, data);

const createUser = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/mobileuser/create`, data);

const getInfo = async (data: string): Promise<any> => {
    return await apiService.axiosGet(`${base}/mobileuser/info/${data}/`);
};

const qrCode = async (data: FormData): Promise<any> =>
    await apiService.axiosPost(`${base}/mobileuser/qrcode`, data, {
        'Content-Type': 'multipart/form-data',
    });

const deepseek = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/deepseek`, data);


export default { getCode, createUser, getInfo, qrCode, deepseek };

import apiService from '@/utils/axios-http';

const base = '/api/v1';

const createUser = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/user`, data);

const getInfo = async (): Promise<any> => await apiService.axiosGet(`${base}/info`);


const addInfo = async (data: object): Promise<any> =>
    await apiService.axiosPost(`${base}/info`, data);

const editInfo = async (data: object, id: number | null): Promise<any> =>
    await apiService.axiosPost(`${base}/info/${id}`, data);

const deleteInfo = async (id: number | null): Promise<any> =>
    await apiService.axiosDelete(`${base}/info/${id}`);

export default { createUser, getInfo, addInfo, editInfo, deleteInfo };

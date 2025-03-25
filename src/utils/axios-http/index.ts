/**
 * @description axios 二次封装
 * @Author Eden
 * @Date 2025/03/17
 *
 */

import axios from 'axios';
import { Toast } from '@ant-design/react-native';

// 请求列表
const requestList: any = [];

// 取消列表
const { CancelToken } = axios;

const sources: any = {};

// cosnt baseURL = '/';
const baseURL = 'http://47.108.85.15:7001';
// const baseURL = 'http://10.66.52.15:7001';

const service: any = axios.create({
  baseURL,
  timeout: 60000, // 超时取消请求
});

// 请求拦截处理
service.interceptors.request.use(
  (config: any) => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.data);

    config.cancelToken = new CancelToken((cancel) => {
      sources[request] = cancel;
    });

    // 请求处理
    if (requestList.includes(request)) {
      // 重复
      sources[request]('取消重复请求');
    } else {
      // 不重复
      requestList.push(request);
    }

    return config;
  },
  async (error: any) => {
    // 异常处理
    return await Promise.reject(error);
  }
);

// 响应拦截处理
service.interceptors.response.use(
  (response: any) => {
    const request =
      JSON.stringify(response.config.url) +
      JSON.stringify(response.config.data);

    // 获取响应后，请求列表里面去除这个值
    requestList.splice(
      requestList.findIndex((item: any) => item === request),
      1
    );

    if (response?.data?.errCode !== 0 && response?.data?.errMsg) {
      Toast.show({ content: response?.data?.errMsg, position: 'center' });
    }

    return response;
  },
  (error: any) => {
    // 取消请求
    if (axios.isCancel(error)) {
      requestList.length = 0;

      return {
        Code: -200,
        message: '取消请求',
        cause: '取消请求',
      };
      // console.log('cancel request');
      // throw new service.Cancel('cancel request');
    }

    return error;
  }
);

// axios 对请求的处理
const request = async (
  url: string,
  params: any,
  config: any,
  method: string
): Promise<any> => {
  return await new Promise((resolve, reject) => {
    service[method](url, params, Object.assign({}, config))
      .then(
        (response: any) => {
          response && response.status === 200 && resolve(response.data);

          response &&
            response.response &&
            Toast.show({ content: response.response.data.msg, position: 'center' });
        },
        (err: any) => {
          if (err.Cancel) {
            Toast.show({ content: err, position: 'center' });
          }
          // else {
          // }
        }
      )
      .catch((err: any) => {
        reject(err);
      });
  });
};

// get方法
const axiosGet = async (
  url: string,
  params = {},
  config = { 'Content-Type': 'application/json; charset=utf-8' }
): Promise<any> => {
  return await request(url, params, config, 'get');
};

// delete 方法
const axiosDelete = async (
  url: string,
  params = {},
  config = { 'Content-Type': 'application/json; charset=utf-8' }
): Promise<any> => {
  return await request(url, params, config, 'delete');
};

// post方法
const axiosPost = async (
  url: string,
  params: any,
  config = { 'Content-Type': 'application/json; charset=utf-8' }
): Promise<any> => {
  return await request(url, params, config, 'post');
};

// put方法
const axiosPut = async (
  url: string,
  params: any,
  config = { 'Content-Type': 'application/json; charset=utf-8' }
): Promise<any> => {
  return await request(url, params, config, 'put');
};

export default { sources, axiosGet, axiosDelete, axiosPost, axiosPut, baseURL };

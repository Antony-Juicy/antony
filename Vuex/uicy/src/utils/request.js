import axios from 'axios';

// 创建一个axios实例
export const request = axios.create({
    baseURL: process.env.NODE_ENV=== 'development' ? 
            'http://localhost:2020/api' :
            'http://126.36.11.23'
})


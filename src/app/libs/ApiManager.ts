import axios, { AxiosError } from 'axios';
import config from '../global/config';

const ApiManager = axios.create({
    baseURL: config.urls.api,
    timeout: config.apiConfig.timeout
});

ApiManager.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
ApiManager.interceptors.response.use(
    response => {
        switch (response.status) {
            case 300:
            case 301:
            case 302:
            case 303:
            case 307:
            case 308:
                window.location.href = response.headers.location;
                break;
            default:
                break;
        }

        return response;
    },
    (error: AxiosError) => {
        // MARK: Add global error handling

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    break;
                case 401:
                    break;
                case 403:
                    break;
                case 404:
                    break;
                case 422:
                    break;
                case 500:
                    break;
                default:
                    break;
            }
        }

        return Promise.reject(error);
    }
);

export default ApiManager;
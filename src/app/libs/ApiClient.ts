import axios, { AxiosError } from 'axios';
import config from '../global/config';

const ApiClient = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout
});

ApiClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
ApiClient.interceptors.response.use(
    response => {
        /** Add global response handling here.
         *  By default, we enable redirection
         *  via redirection HTTP response codes.
         * **/

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
        /** Add global error handling here **/

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

export default ApiClient;
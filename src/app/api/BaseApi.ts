import {HttpMethod} from "../global/classes/Enums";
import {AxiosRequestConfig} from "axios";
import ApiClient from "../libs/ApiClient";

abstract class BaseApi {
    static sendApiRequest<T>(method: HttpMethod, resourceName: string, data?: T, id?: string, extraOptionsConfig?: AxiosRequestConfig): Promise<T> {
        let path = `/${resourceName}`;

        if (id) path += `/${id}`;

        switch (method) {
            case HttpMethod.GET:
                return ApiClient.get<T>(path, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.POST:
                return ApiClient.post<T>(path, data, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.PUT:
                return ApiClient.put<T>(path, data, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.DELETE:
                return ApiClient.delete(path, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.HEAD:
                return ApiClient.head(path, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.PATCH:
                return ApiClient.patch(path, data, extraOptionsConfig)
                    .then(result => result.data);
        }
    }

    static sendApiRequestWithResult<T, TResult>(method: HttpMethod, resourceName: string, data?: T, id?: string, extraOptionsConfig?: AxiosRequestConfig): Promise<TResult> {
        let path = `/${resourceName}`;

        if (id) path += `/${id}`;

        switch (method) {
            case HttpMethod.GET:
                return ApiClient.get<TResult>(path, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.POST:
                return ApiClient.post<TResult>(path, data, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.PUT:
                return ApiClient.put<TResult>(path, data, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.DELETE:
                return ApiClient.delete(path, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.HEAD:
                return ApiClient.head(path, extraOptionsConfig)
                    .then(result => result.data);
            case HttpMethod.PATCH:
                return ApiClient.patch<TResult>(path, data, extraOptionsConfig)
                    .then(result => result.data);
        }
    }
}

export default BaseApi;
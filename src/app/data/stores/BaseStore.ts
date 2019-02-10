import {action, computed, observable, runInAction} from "mobx";
import {ApiError} from "../models/Errors";

abstract class BaseStore {
    // MARK: Observable Properties
    @observable public isLoading: boolean = true;
    @observable public apiErrors: ApiError[] = [];

    // MARK: Error Handling
    @action
    resetApiErrors = () => {
        if (this.hasErrored) {
            this.apiErrors = [];
        }
    };

    @computed
    get hasErrored() {
        return this.apiErrors.length > 0;
    }

    saveError = (...errors: ApiError[]) => {
        return runInAction(() => {
            this.apiErrors.push(...errors);
            this.isLoading = false;
        })
    }
}

export default BaseStore
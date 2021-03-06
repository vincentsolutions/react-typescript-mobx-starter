import {action, computed, observable, runInAction} from "mobx";
import Item from "../models/Item";
import {ApiError} from "../models/Errors";
import ItemsApi from "../../api/ItemsApi";
import BaseStore from "./BaseStore";

export class ItemStore extends BaseStore {

    // MARK: Observable Properties
    @observable public items: Item[] = [];

    // MARK: Actions
    @action
    loadItems = async () => {
        this.isLoading = true;

        let items = await ItemsApi.getItems();

        runInAction(() => {
            this.items = items;
            this.isLoading = false;
        })
    };

    @action
    getItemById = (id: string) => {
        return this.items.find(x => x.id === id);
    };

    @action
    getItemIndexById = (id: string) => {
        return this.items.findIndex(x => x.id === id);
    };

    @action
    addItem = async (item: Item) => {
        this.isLoading = true;
        this.resetApiErrors();

        try {
            const result = await ItemsApi.addItem(item);

            runInAction(() => {
                this.items.push(result);
                this.isLoading = false;
            });
        } catch(err) {
            if (err instanceof ApiError) {
                this.saveError(err);
                return;
            }

            throw err;
        }
    };

    @action
    updateItem = async (id: string, item: Partial<Item>) => {
        const index = this.getItemIndexById(id);

        if (index >= 0) {
            this.isLoading = true;
            this.resetApiErrors();

            try {
                const result = await ItemsApi.updateItem(id, item);

                runInAction(() => {
                    this.items[index] = result;
                    this.isLoading = false;
                });
            } catch (err) {
                if (err instanceof ApiError) {
                    this.saveError(err);
                    return;
                }

                throw err;
            }
        }
    };

    @action
    removeItem = async (id: string) => {
        const index = this.getItemIndexById(id);

        if (index >= 0) {
            this.isLoading = true;
            this.resetApiErrors();

            try {
                await ItemsApi.removeItem(id);

                runInAction(() => {
                    this.items.splice(index, 1);
                    this.isLoading = false;
                });
            } catch (err) {
                if (err instanceof ApiError) {
                    this.saveError(err);
                    return;
                }

                throw err;
            }
        }
    };

    // MARK: Computed Properties
    @computed
    get itemsCount() {
        return this.items.length;
    }
}

const itemStore = new ItemStore();

export default itemStore;
import Item from "../data/models/Item";
import BaseApi from "./BaseApi";
import {HttpMethod} from "../global/classes/Enums";

class ItemsApi extends BaseApi {
    static resourceName = "items";

    static async getItems() {
        return this.sendApiRequest<Item[]>(HttpMethod.GET, ItemsApi.resourceName)
            .catch(error => {
                console.log(error);
                return [] as Item[];
            })
    }

    static async getItem(id: string) {
        return this.sendApiRequest<Item>(HttpMethod.GET, ItemsApi.resourceName, undefined, id);
    }

    static async addItem(item: Item) {
        return this.sendApiRequest(HttpMethod.POST, ItemsApi.resourceName, item);
    }

    static async updateItem(id: string, item: Partial<Item>) {
        return this.sendApiRequestWithResult<Partial<Item>, Item>(HttpMethod.PUT, ItemsApi.resourceName, item, id);
    }

    static async removeItem(id: string) {
        return this.sendApiRequest<null>(HttpMethod.DELETE, ItemsApi.resourceName, undefined, id);
    }
}

export default ItemsApi;
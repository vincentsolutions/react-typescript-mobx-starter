import ApiManager from "../libs/ApiManager";
import Item from "../data/models/Item";

class ItemsApi {
    static async getItems() {
        return ApiManager.get('/items')
            .then(result => result.data as Item[])
            .catch(error => {
                console.log(error);
                return [] as Item[];
            })
    }

    static async getItem(id: string) {
        return ApiManager.get(`/items/${id}`)
            .then(result => result.data as Item)
    }

    static async addItem(item: Item) {
        return ApiManager.post('/items', item)
            .then(result => result.data as Item)
    }

    static async updateItem(id: string, item: Partial<Item>) {
        return ApiManager.put(`/items/${id}`, item)
            .then(result => result.data as Item)
    }

    static async removeItem(id: string) {
        return ApiManager.delete(`/items/${id}`)
            .then(result => id)
    }
}

export default ItemsApi;
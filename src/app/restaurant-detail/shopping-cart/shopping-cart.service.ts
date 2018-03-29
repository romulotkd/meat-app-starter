import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {
    items : CartItem[] = []

    clear(){
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find ((mItem) => mItem.menuItem.id === item.id)

        if (foundItem) {
            foundItem.quantity += 1
        } else {
            this.items.push(new CartItem(item))
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items
            .map(item => item.value()) //transformo minha lista de CartItem em lista de números
            .reduce((prev, value) => prev + value, 0) //itero pela lista somando os números e retornando o total
    }
}
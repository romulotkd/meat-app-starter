import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "../order/order.model";
import { Http, Headers, RequestOptions } from "@angular/http"
import { Observable } from "rxjs/Observable"
import { MEAT_API } from '../app.api'

import 'rxjs/add/operator/map'



@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: Http) { }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQtd(item: CartItem) {
        this.cartService.increaseQtd(item)
    }

    decreaseQtd(item: CartItem) {
        this.cartService.decreaseQtd(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    clear() {
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        const request = new RequestOptions({ headers: headers });
        return this.http.post(`${MEAT_API}/orders`, 
                            JSON.stringify(order), request)
                            .map(response => response.json())
                            .map(order => order.id)
    }

}
import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service"
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model"
import { Order, OrderItem } from "../order/order.model"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs/Observable"
import { MEAT_API } from '../app.api'

import 'rxjs/add/operator/map'
import { LoginService } from "../security/login/login.service";



@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient, private loginService: LoginService) { }

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
        let headers = new HttpHeaders()
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, { headers: headers })
            .map(order => order.id)
    }

}
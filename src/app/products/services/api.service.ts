import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  removeWishlist(id: any) {
    throw new Error('Method not implemented.');
  }

  BASE_URL = 'http://localhost:5000'
  searchTerm = new BehaviorSubject('')
  getCartItemCount = new BehaviorSubject(0)

  constructor(private http: HttpClient) {
    this.cartCount()
  }

  //Get all products
  getAllProducts() {
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }
  viewProduct(id: any) {
    return this.http.get(`${this.BASE_URL}/products/viewproducts/${id}`)
  }

  //add to wishlist product
  addtowishlist(id: any, title: string, price: any, image: string) {
    const body = {
      id,
      title,
      price,
      image,
    }
    return this.http.post(`${this.BASE_URL}/products/addtowishlist`, body)
  }

  getAllWishlist() {
    return this.http.get(`${this.BASE_URL}/products/getwishlist`)
  }

  deleteWishlist(id: any) {
    return this.http.delete(`${this.BASE_URL}/products/deletewishlist/${id}`)
  }

  //add to cart
  addToCart(product: any) {
    const body = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: product.quantity
    }
    return this.http.post(`${this.BASE_URL}/products/addtocart`, body)
  }

  //get all cart
  getAllCart() {
    return this.http.get(`${this.BASE_URL}/products/getcarts`)
  }

  cartCount() {
    this.getAllCart().subscribe((result: any) => {
      this.getCartItemCount.next(result.length)
    })
  }

  //delete cart
  deleteCart(id:any) {
    return this.http.delete(`${this.BASE_URL}/products/deletecart/${id}`)
  }

  //increment cart count
  incrementCartCount (id:any) {
    return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
  }
  //Decrement cart count
  decrementCartCount (id:any) {
    return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
  }
}

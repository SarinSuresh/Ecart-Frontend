import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any = [];
  constructor(private Api: ApiService) { }
  ngOnInit(): void {
    this.Api.getAllWishlist().subscribe((result:any)=>{
      console.log(result);
      this.wishlist=result;
      
    },
    (result:any)=>{
      console.log(result.error);
      
    })
   
  }

  //delete api call
  deleteWishlist (id:any){
    this.Api.deleteWishlist(id).subscribe((result:any)=>{
      this.wishlist = result
      alert("Product Deleted")
    },
    (result:any)=>{
      alert(result.error)
    })

  }

  addToCart(product: any) {

    //add quantity to cart
    Object.assign(product, { quantity: 1 })
    console.log(product);
    //api call to add quantity
    this.Api.addToCart(product).subscribe((result: any) => {
      alert(result)
    },
      (result: any) => {
        alert(result.error)
      }
    )
  }
}

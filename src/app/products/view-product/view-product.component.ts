import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  isClicked: boolean = false;
  productId: string = ""


  constructor(private viewRoute: ActivatedRoute, private api: ApiService) { }
  product: any;
  ngOnInit(): void {
    this.viewRoute.params.subscribe((result: any) => {
      console.log(result.productId);
      this.productId = result.productId;
      this.api.viewProduct(this.productId).subscribe((result: any) => {
        console.log(result);
        this.product = result
      },
        (result: any) => {
          console.log(result.error);

        })

    });
  }
  addtowishlist() {
    const { id, title, price, image } = this.product

    //api function
    this.api.addtowishlist(id, title, price, image,).subscribe((result: any) => {
      alert(result)
    },
      (result: any) => {
        alert(result.error)
      }
    )
  }
  addToCart(product: any) {

    //add quantity to cart
    Object.assign(product, { quantity: 1 })
    console.log(product);
    //api call to add quantity
    this.api.addToCart(product).subscribe((result: any) => {
      alert(result)
    },
      (result: any) => {
        alert(result.error)
      }
    )
  }

  
}

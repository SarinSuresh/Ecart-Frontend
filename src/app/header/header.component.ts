import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../products/services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService,private router: Router) {}
  //to hold search term
  searchTerm: string=""

  cartItemsCount: number = 0

 ngOnInit(): void {
  this.api.getCartItemCount.subscribe((data:any)=>{
    this.cartItemsCount=data;
  })
 }


  search(event:any){
  
   console.log(event.target.value);//search value
   //to assign new value to behavior subject to use next() method 
    this.api.searchTerm.next(event.target.value)//add search term to behavior subject
  }
 
  // navigateToOtherComponent() {
  //   // Navigate to the desired component
  //   this.router.navigate(['/signin']); // Route path
  //   // or
  //   this.router.navigate([{ outlets: { primary: 'signin' } }]); // Route object
  // }
  
}

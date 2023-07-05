import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
 
  {
    path: 'viewproduct/:productId', component: ViewProductComponent
  },
  {
    path: 'wishlist', component: WishlistComponent
  },
  {
    path:'cart', component: CartComponent
  },
  {
    path: 'signin', component: SignInComponent
  },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

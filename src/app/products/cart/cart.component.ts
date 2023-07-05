import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms'
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //from paypal
  public payPalConfig?: IPayPalConfig;

  proceedtopay:boolean = false
  showSuccess : boolean = false
  
  offerClicked : boolean = false
   //  to hold payment status
  paymentStatus: boolean = false
  username: any
  totalPrice: number = 0

  allCart: any = []
  house: any;
  address: any;
  Pincode: any;
  phone: any;
  discountStatus: boolean = false;
  constructor(private api: ApiService, private paymentFB: FormBuilder) { }
  //form group
  //address form validation
  cartForm=this.paymentFB.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z" "]*')]],
    house:['',[Validators.required,Validators.pattern('[0-9]*')]],
    street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    mobile:['',[Validators.required,Validators.pattern('[0-9]*')]],

 })


  ngOnInit(): void {

    //paypal function all
    this.initConfig();
    this.api.getAllCart().subscribe((result: any) => {
      console.log(result);
      this.allCart = result;
      this.getCartTotal()
    },
      (result: any) => {
        console.log(result.error);

      }
    )
  }

  modalClose() {
    this.cartForm.reset()
    this.showSuccess=false
    this.discountStatus=false
  }

  deleteCart(id: any) {
    this.api.deleteCart(id).subscribe((result: any) => {
      this.allCart = result
      alert('product removed')
      this.api.cartCount()
    },
      (result: any) => {
        alert(result.error)
      }
    )
  }

  makepay() {
    this.proceedtopay = true
  }
  getCartTotal() {
    let total = 0
    this.allCart.forEach((item: any) => {
      total = total + item.grandTotal
      this.totalPrice = Math.ceil(total)

    })
  }


  incrementsCart(id: any) {
    this.api.incrementCartCount(id).subscribe((result: any) => {
      this.allCart = result
      this.getCartTotal()
    },
      (result: any) => {
        alert(result.error)
      })
  }

  decrementsCart(id: any) {
    this.api.decrementCartCount(id).subscribe((result: any) => {
      this.allCart = result
      this.getCartTotal()
    },
      (result: any) => {
        alert(result.error)
      })
  }

  submitForm() {
    if (this.cartForm.valid) {
      this.paymentStatus = true
      this.username = this.cartForm.value.name
      this.house = this.cartForm.value.house
      this.address = this.cartForm.value.street
      this.Pincode = this.cartForm.value.pincode
      this.phone = this.cartForm.value.mobile

    } else {
      alert("Please enter valid information")
    }

  }
  offerClick() {
    this.offerClicked = true
  }

  discount(value:any){
    this.totalPrice=Math.ceil(this.totalPrice*(100-value)/100)
    this.offerClicked=false
    this.discountStatus=true

  }

  //Paypal function

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

}






import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from '../../products/models/product';
import { ProductService } from '../../products/service/product.service';
import { Observable } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  
  constructor( private productService:ProductService,private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.products, 'name');
    console.log(this.sortedCollection);
   }
  public products:Observable<IProduct[]> = null;
 
  ngOnInit() {
      this.products = this.productService.getAllProducts()
  }
  searchText;
  order: string = 'name';
  reverse: boolean = false;
  sortedCollection: any[];
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}

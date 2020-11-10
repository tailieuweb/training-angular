import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Product, IProduct } from '../../products/models/product';
import { ProductService } from '../../products/service/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  selectedFile: ImageSnippet;

  private observableSubscription:Array<Subscription> = [];
  formSubmitted = false;
  productForm = this.fb.group({});
  constructor(
    private fb:FormBuilder,
    private productService:ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
    
  processFile(imageInput: any) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
  
      reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, file);
      });
  
      reader.readAsDataURL(file);
    }

  ngOnInit() {
    this.productForm.addControl('id',new FormControl(''));
    this.productForm.addControl('name',new FormControl('',[Validators.required]));
    this.productForm.addControl('code',new FormControl('',[Validators.required]));
    this.productForm.addControl('description',new FormControl('',[Validators.required]));
    this.productForm.addControl('price',new FormControl('',[Validators.required]));

    const product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.productService.getProductById(Number.parseInt(params.get('id')))
        ));

        product$.subscribe(product=>{
          if(!isNullOrUndefined(product)){
            console.log(product);
            this.productForm.get('id').setValue(product.id);
            this.productForm.get('name').setValue(product.name);
            this.productForm.get('code').setValue(product.code);
            this.productForm.get('description').setValue(product.description);
            this.productForm.get('price').setValue(product.price);
         
          }
        })
  }

  ngOnDestroy(){
    this.observableSubscription.forEach(item => {
      item.unsubscribe();
      console.log(item, 'unsubscribed');
    });
  }

  save($event:any):void{

    this.formSubmitted = true;
    if(!this.productForm.valid){
      return;
    }

    this.saveProduct();

    // navigate back to products list
    this.router.navigateByUrl('admin');
  }

  saveAndContinue($event:any):void{
    this.formSubmitted = true;
    console.log(this.productForm.get('name').errors);
    if(!this.productForm.valid){
      return;
    }

    this.saveProduct();

  }

  saveProduct():void{
    const product =new Product();
    // map data from form to product
    product.id = this.productForm.get('id').value;
    product.name = this.productForm.get('name').value;
    product.code = this.productForm.get('code').value;
    product.description=this.productForm.get('description').value;
    product.price=this.productForm.get('price').value;
    
   product.image='../../../assets/img/product-thumb-1.jpg';

    // save to database
    if(product.id == 0){
      this.productService.addNewProduct(product);}
      else {
        this.productService.updateProduct(product);
      }
  }


}

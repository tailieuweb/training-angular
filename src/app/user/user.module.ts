import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ShowComponent } from './show/show.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {OrderModule} from 'ngx-order-pipe';
@NgModule({
  declarations: [DetailComponent, ShowComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    OrderModule
  ]
})
export class UserModule { }

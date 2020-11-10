import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ShowComponent } from './show/show.component';
const routes: Routes = [
  {
    path:'detail/:id',
    component:DetailComponent
  },
  {
    path:'',
    component:ShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

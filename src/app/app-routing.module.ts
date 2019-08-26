import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectComponent } from './select/select.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  { path : '', component : SelectComponent},
  { path : 'result/:result', component : ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

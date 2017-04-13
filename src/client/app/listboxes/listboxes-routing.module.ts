import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListboxesComponent } from './listboxes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'listboxes', component: ListboxesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ListboxesRoutingModule { }
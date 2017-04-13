import { NgModule } from '@angular/core';
import { ListboxesComponent } from './listboxes.component';
import { ListboxesRoutingModule } from './listboxes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ListboxesRoutingModule, SharedModule],
  declarations: [ListboxesComponent],
  exports: [ListboxesComponent],
  providers: []
})
export class ListboxesModule { }
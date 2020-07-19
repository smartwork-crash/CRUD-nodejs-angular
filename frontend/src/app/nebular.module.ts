import { NgModule } from '@angular/core';
import { NbCardModule, NbButtonModule, NbInputModule, NbPopoverModule, NbIconModule, NbListModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [],
  imports: [
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbPopoverModule,
    NbIconModule,
    NbContextMenuModule,
    NbListModule,
    NbEvaIconsModule
  ],
  exports: [
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbListModule,
    NbIconModule,
  ]
})
export class NebularModule { }

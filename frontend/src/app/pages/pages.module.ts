/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesMenu } from './pages-menu';
import { NbMenuModule } from '@nebular/theme';
import { NebularModule } from '../nebular.module';
import { AuthModule } from '../@auth/auth.module';
import { StarterMenuModule } from './starter/starter.module';
import { ContactsComponent } from '../@components/contacts/contacts.component';
import { AccountsComponent } from '../@components/accounts/accounts.component';
import { AddEditContactComponent } from '../@components/add-edit-contact/add-edit-contact.component';
import { AddEditAccountComponent } from '../@components/add-edit-account/add-edit-account.component';

const PAGES_COMPONENTS = [
  PagesComponent, ContactsComponent, AccountsComponent, AddEditContactComponent, AddEditAccountComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    StarterMenuModule,
    ThemeModule,
    FormsModule, 
    ReactiveFormsModule,
    NbMenuModule,
    NebularModule,
    AuthModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    PagesMenu,
  ],
  entryComponents: [AddEditContactComponent, AddEditAccountComponent]
})
export class PagesModule {
}

import { Component, OnInit } from '@angular/core';
import { ComponentServiceService } from '../component-service.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  listObserve: Observable<any>;
  listSubscription: Subscription;
  actions = [{ title: 'Edit' }, { title: 'Delete' }];
  contacts: any[] = [];
  idClicked: string;
  dialogData: object;

  constructor(
    private serviceProvider: ComponentServiceService,
    private toastrService: NbToastrService,
    private nbMenuService: NbMenuService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.getContactList();
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-contact-menu'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => {
        if (title == 'Edit') this.addOrEditContact(title);
        else this.deleteContact();
      });
  }



  getContactList() {
    this.listObserve = this.serviceProvider.getContactList();
    this.listSubscription = this.listObserve.subscribe(list => {
      this.contacts = list;
    })
  }

  addOrEditContact(action: string) {
    action == 'Add' ? this.idClicked = undefined : this.idClicked;
    this.dialogData = { action: action, id: this.idClicked };
    let dialog = this.dialogService.open(AddEditContactComponent, { hasScroll: true, closeOnBackdropClick: false, context: this.dialogData });
    dialog.onClose.subscribe(result => {
      if (result) {
        this.getContactList();
      }
    })
  }

  setId(id: string) {
    this.idClicked = id;
  }

  deleteContact() {
    this.serviceProvider.deleteContact(this.idClicked).subscribe(res => {
      this.toastrService.show("Account deleted successfully");
      console.log('vdfd');
      
      this.getContactList();
    })
  }

}

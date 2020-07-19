import { Component, OnInit } from '@angular/core';
import { ComponentServiceService } from '../component-service.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { AddEditAccountComponent } from '../add-edit-account/add-edit-account.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  listObserve: Observable<any>;
  listSubscription: Subscription;
  actions = [{ title: 'Edit' }, { title: 'Delete' }];
  accounts: any[] = [];
  idClicked: string;
  dialogData: object;

  constructor(
    private serviceProvider: ComponentServiceService,
    private nbMenuService: NbMenuService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.getAccountList();
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-account-menu'),
        map(({ item: { title } }) => title),
    )
      .subscribe(title => {
        if (title == 'Edit') this.addOrEditAccount(title);
        else this.deleteAccount();
      });
  }

  getAccountList() {
    this.listObserve = this.serviceProvider.getAccountList();
    this.listSubscription = this.listObserve.subscribe(list => {
      this.accounts = list;
      console.log(this.accounts);

    })
  }

  addOrEditAccount(action: string) {
    action == 'Add' ? this.idClicked = undefined : this.idClicked;
    this.dialogData = { action: action, id: this.idClicked };
    let dialog = this.dialogService.open(AddEditAccountComponent, { hasScroll: true, closeOnBackdropClick: false, context: this.dialogData });
    dialog.onClose.subscribe(result => {
      if (result) {
        this.getAccountList();
      }
    })
  }

  setId(id: string) {
    this.idClicked = id;
  }

  deleteAccount() {
    this.serviceProvider.deleteAccount(this.idClicked).subscribe(res => {
      this.toastrService.show("Account deleted successfully");
      this.getAccountList();
    })
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ComponentServiceService } from '../component-service.service';
import { NbToastrService, NbComponentStatus, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit, AfterViewInit {

  accountForm: FormGroup;
  id: string;
  action: string;

  constructor(
    private formBuilder: FormBuilder,
    private serviceProvider: ComponentServiceService,
    private toastrService: NbToastrService,
    private ref: NbDialogRef<AddEditAccountComponent>
  ) { }

  ngOnInit(): void {
    this.createAccountForm();
  }

  ngAfterViewInit(): void {
    console.log(this.id,new Date());
    
    if(this.id !== undefined) {
      console.log(this.id);
      
      this.serviceProvider.getAccount(this.id).subscribe(data => {
        this.createAccountForm(data);
      })
    }
  }

  createAccountForm(accInfo?: any) {
    this.accountForm = this.formBuilder.group({
      companyDomainName: new FormControl(accInfo && accInfo['companyDomainName'] || '',Validators.required),
      industry: new FormControl(accInfo && accInfo['industry'] || '', Validators.required),
      companyOwner: new FormControl(accInfo && accInfo['companyOwner'] || '', Validators.required),
      phoneNumber: new FormControl(accInfo && accInfo['phoneNumber'] || '', Validators.required),
      city: new FormControl(accInfo && accInfo['city'] || '',Validators.required),
      state: new FormControl(accInfo && accInfo['state'] || '', Validators.required),
      postalCode: new FormControl(accInfo && accInfo['postalCode'] || '', Validators.required),
      linkedIn: new FormControl(accInfo && accInfo['linkedIn'] || '', Validators.required),
      createdDate: new FormControl(accInfo && accInfo['createdDate'] || ''),
    })
  }

  addAccount(event: Event) {
    if(this.accountForm.valid) {
      console.log(this.accountForm);
      if(this.action == 'Add'){
      this.accountForm.value.createdDate = new Date();
      this.serviceProvider.addAccount(this.accountForm.value).subscribe(res => {
      this.toastrService.show("Account added successfully");
      this.ref.close('added');
      })
    }
    else {
      this.serviceProvider.editAccount(this.id,this.accountForm.value).subscribe(res => {
        this.toastrService.show("Account edited successfully");
      this.ref.close('edited');
        })
    }
  }
    else {
      this.toastrService.show("Please fill all fields first");
    }
  }

  close() {
    this.ref.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ComponentServiceService } from '../component-service.service';
import { NbToastrService, NbComponentStatus, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  contactForm: FormGroup;
  id: string;
  action: string;

  constructor(
    private formBuilder: FormBuilder,
    private serviceProvider: ComponentServiceService,
    private toastrService: NbToastrService,
    private ref: NbDialogRef<AddEditContactComponent>
  ) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  ngAfterViewInit(): void {
    console.log(this.id,new Date());
    
    if(this.id !== undefined) {
      console.log(this.id);
      
      this.serviceProvider.getContact(this.id).subscribe(data => {
        this.createContactForm(data);
      })
    }
  }

  createContactForm(conInfo?: any) {
    this.contactForm = this.formBuilder.group({
      fullName: new FormControl(conInfo && conInfo['fullName'] || '', Validators.required),
      title: new FormControl(conInfo && conInfo['title'] || '', Validators.required),
      organization: new FormControl(conInfo && conInfo['organization'] || '', Validators.required),
      email: new FormControl(conInfo && conInfo['email'] || '', Validators.required),
      phone: new FormControl(conInfo && conInfo['phone'] || '', Validators.required),
      facebookId: new FormControl(conInfo && conInfo['facebookId'] || '', Validators.required),
      twitterId: new FormControl(conInfo && conInfo['twitterId'] || '', Validators.required)
    })
  }

  addContact(event: Event) {
    if (this.contactForm.valid) {
      console.log(this.contactForm);
      if (this.action == 'Add') {
        this.serviceProvider.addContact(this.contactForm.value).subscribe(res => {
          this.toastrService.show("Contact added successfully");
          this.ref.close('added');
        },
      err => {
        this.toastrService.show("Error");

      })
      }
      else {
        this.serviceProvider.editContact(this.id, this.contactForm.value).subscribe(res => {
          this.toastrService.show("Contact edited successfully");
          this.ref.close('edited');
        },
        err => {
          this.toastrService.show("Error");
  
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

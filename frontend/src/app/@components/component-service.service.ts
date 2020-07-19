import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentServiceService {

  default: string = 'http://localhost:3001/';
  account: string = 'account/';
  contact: string = 'contact/';
  list: string = 'list'

  constructor(private http: HttpClient) { }

  getContactList() {
    return this.http.get(this.default + this.contact + this.list).pipe(map(res => res), catchError(error => error));
  }

  getAccountList() {
    return this.http.get(this.default + this.account + this.list).pipe(map(res => res), catchError(error => error));
  }

  addContact(contactData) {
    return this.http.post(this.default + this.contact, contactData).pipe(map(res => res), catchError(error => error));
  }

  editContact(id: string, contactData) {
    return this.http.patch(this.default + this.contact + id, contactData).pipe(map(res => res), catchError(error => error));
  }

  getContact(id: string) {
    return this.http.get(this.default + this.contact + id).pipe(map(res => res), catchError(error => error));
  }

  deleteContact(id: string) {
    return this.http.delete(this.default + this.contact + id).pipe(map(res => res), catchError(error => error));
  }

  addAccount(accountData) {
    return this.http.post(this.default + this.account, accountData).pipe(map(res => res), catchError(error => error));
  }

  editAccount(id: string, accountData) {
    return this.http.patch(this.default + this.account + id, accountData).pipe(map(res => res), catchError(error => error));
  }

  getAccount(id: string) {
    console.log(id);
    
    return this.http.get(this.default + this.account + id).pipe(map(res => res), catchError(error => error));
  }

  deleteAccount(id: string) {
    return this.http.delete(this.default + this.account + id).pipe(map(res => res), catchError(error => error));
  }
}

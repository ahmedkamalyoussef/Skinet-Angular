import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private http=inject(HttpClient)
  get404Error() {
    return this.http.get(environment.apiUrl + 'buggy/notfound');
  }

  get500Error() {
    return this.http.get(environment.apiUrl + 'buggy/internalerror');
  }

  get400Error() {
    return this.http.get(environment.apiUrl + 'buggy/badrequest');
  }

  get401Error() {
    return this.http.get(environment.apiUrl + 'buggy/unauthorized');
  }

 grt400ValidationError() {
    return this.http.post(environment.apiUrl + 'buggy/validationerror', {});
  }
} 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions: any = {};
  tumorDataSet : any;
  constructor(protected http: HttpClient) { }

  tumorData = {
    get : () => {return this.tumorDataSet},
    set : (v) => { this.tumorDataSet = [...v]}
  }
  getAllTumor(): Observable<any> {
    return this.http.get(
       '/api/all',
      (this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/admin';


@Injectable({ providedIn: 'root' })
export class ParaCurrencyRateService {

  constructor(private http: HttpClient) { }

  getAll(data: any): Observable<any> {
    return this.http.post(`${API_URL}/Country/getAll`, data,{ withCredentials: true });

  }

  list(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/list`, searchInput,{ withCredentials: true });
  }



  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/Create`, data,{ withCredentials: true });
  }

  // update(id: number, data: any): Observable<any> {
  //   return this.http.post(`${API_URL}/Update?id=${id}`, data);
  // }
  update(data: any): Observable<any> {
    return this.http.post(`${API_URL}/Update`, data,{ withCredentials: true });
  }


  // delete(id: number): Observable<any> {
  //   return this.http.post(`${API_URL}/delete?id=${id}`, null,{responseType: 'text'});
  // }


  delete(id: number): Observable<any> {
    return this.http.post(`${API_URL}/delete`, { id }, { responseType: 'text',withCredentials: true });
  }

  findBySpec(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/findBySpec`, searchInput,{ withCredentials: true });
  }

  findByNav(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/findByNav`, searchInput,{ withCredentials: true });
  }

  findByPro(searchInput: any): Observable<any> {
    return this.http.post(`${API_URL}/findByPro`, searchInput,{ withCredentials: true });
  }
}

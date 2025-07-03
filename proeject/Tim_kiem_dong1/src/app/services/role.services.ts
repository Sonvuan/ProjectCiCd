import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/admin';


@Injectable({ providedIn: 'root' })
export class RoleService {

    constructor(private http: HttpClient) { }

    update(data: any): Observable<any> {
        return this.http.post(`${API_URL}/role/UpdateRole`, data, { withCredentials: true });
    }
    getAllRole(data: any): Observable<any> {
        return this.http.post(`${API_URL}/role/getAllRole`, data, { withCredentials: true });
    }
    remove(data: any): Observable<any> {
        return this.http.post(`${API_URL}/role/removeRole`, data, { withCredentials: true });
    }
    getAllPermission(data: any): Observable<any> {
        return this.http.post(`${API_URL}/permission/getAllPermission`, data, { withCredentials: true });
    }
    updatePermission(data: any): Observable<any> {
        return this.http.post(`${API_URL}/permission/UpdatePermission`, data, { withCredentials: true });
    }
    removePermission(data: any): Observable<any> {
        return this.http.post(`${API_URL}/permission/RemovePermission`, data, { withCredentials: true });
    }
}

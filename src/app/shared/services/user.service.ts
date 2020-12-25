import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserJson, LoginResponseJson } from '../../shared/json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.endpoint + "/user";

  public static AUTH: string;

  constructor(private http: HttpClient) { }

  login(): Observable<LoginResponseJson> {
    const url = this.baseUrl;
    
    const header: any = new Object();
    header.Authorization = UserService.AUTH;

    return this.http.get<LoginResponseJson>(
      url,
      { headers: header }
    );
  }

  register(user: UserJson): Observable<void> {
    const url = this.baseUrl;

    return this.http.post<any>(
      url,
      user
    );
  }

  delete(id: number, token: string): Observable<void> {
    const url = this.baseUrl + '/' + id;

    const header: any = new Object();
    header.Authorization = token;

    return this.http.delete<any>(
      url,
      { headers: header }
    )
  }
}

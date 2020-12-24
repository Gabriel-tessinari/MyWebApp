import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponseJson } from '../../shared/json';

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
      {headers: header}
    );
  }
}

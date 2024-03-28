import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public headers: HttpHeaders = new HttpHeaders();
  private authToken: string | null = null;
  constructor(private http: HttpClient) {}

  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  isLoggedIn(): boolean {
    return !!this.authToken;
  }
  getResponse(request: string, headers: any): Observable<any> {
    return this.http.get(request, { headers });
  }

}
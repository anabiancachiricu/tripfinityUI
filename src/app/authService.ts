import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public headers: HttpHeaders = new HttpHeaders();
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  setAuthToken(token: string | null): void {
    this.authToken = token;
    localStorage.setItem('token', JSON.stringify(this.authToken));
  }

  getAuthToken(): string | null {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, '');
    }
    return token;
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(new Date().getTime() / 1000);
        return decodedToken.exp > currentTime;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    return false;
  }

  getResponse(request: string, headers: any): Observable<any> {
    return this.http.get(request, { headers });
  }

  logout() {
    localStorage.removeItem('token');
  }
}

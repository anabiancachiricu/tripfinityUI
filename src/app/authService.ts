import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public headers: HttpHeaders = new HttpHeaders();
  private authToken: string | null = null;
  constructor(private http: HttpClient) {}

  setAuthToken(token: string | null): void {
    const currentTime = new Date();
    this.authToken = token;
    localStorage.setItem('token', JSON.stringify(this.authToken));
    localStorage.setItem(
      'expires_at',
      JSON.stringify(currentTime.getTime() / 1000 + 3000)
    );
  }

  getAuthToken(): string | null {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, '');
    }
    return token;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expires_at');
    if (token && expiresAt) {
      const expiresAtTime = JSON.parse(expiresAt);
      const currentTime = new Date().getTime() / 1000;
      if (currentTime < expiresAtTime) {
        return true;
      }
    }
    return false;
  }

  getResponse(request: string, headers: any): Observable<any> {
    return this.http.get(request, { headers });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
}

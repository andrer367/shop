import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AuthResponse, User } from 'src/app/shared/interfaces';
import { enviromnet } from 'src/enviromnets/enviromnet';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${enviromnet.apiKey}`, user).pipe(tap(this.setToken))

  }

  private setToken(response: AuthResponse) {
    if (response) {
      const expData = new Date(new Date().getTime() + response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get Token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '');
    if (new Date > expDate) {
      this.logout()
      return null;
    }

    return localStorage.getItem('fb-token')
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.Token
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}




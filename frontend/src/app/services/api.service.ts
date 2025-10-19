import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  get<T>(path: string, options: object = {}): Observable<T> {
    return this.http.get<T>(path, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, data: any, options: object = {}): Observable<T> {
    return this.http.post<T>(path, data, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(path: string, data: any, options: object = {}): Observable<T> {
    return this.http.put<T>(path, data, options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(path: string, options: object = {}): Observable<T> {
    return this.http.delete<T>(path, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Unknown error';
    return throwError(() => new Error(message));
  }
}

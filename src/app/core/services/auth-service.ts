import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { credentials } from '../auth/interfaces/auth-credentials';
import { LoginResponse } from '../auth/interfaces/loginResponse';
import { rxResource } from '@angular/core/rxjs-interop';

@Service()
export class AuthService {
    private _token = signal<string | null>(localStorage.getItem('tkn'));
    private _authenticated = signal<boolean>(false);

    checkStatusResource = rxResource({
        stream: () => this.checkStatus(),
    });

    private http = inject(HttpClient);

    private apiUrl = 'https://localhost:7045/api'

    login(credentials: credentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
            tap((res: LoginResponse) => {
                if (res && res.token) {
                    this._token.set(res.token);
                    this._authenticated.set(true);
                    localStorage.setItem('tkn', res.token);
                }
                else this.logout();
            })
        )
    }

    logout() {
        this._authenticated.set(false);
        this._token.set(null);
        localStorage.removeItem('tkn');
    }

    checkStatus(): Observable<boolean> {
        const tkn = localStorage.getItem('tkn');
        if (!tkn) {
            this.logout();
            return of(false);
        }

        return this.http.get<boolean>(`${this.apiUrl}/secure/data`, {
        }).pipe(
            map(() => this.handleAuthSuccess(tkn)),
            catchError(() => {
                this.logout()
                return of(false);
            })
        );
    }

    private handleAuthSuccess(tkn: string): boolean {
        this._token.set(tkn);
        this._authenticated.set(true);
        localStorage.setItem('tkn', tkn);
        return true;
    }

    token = computed(this._token);
    authenticated = computed(this._authenticated);
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private resourceUrl: string = environment.backendUrl + "login";

  headers = new HttpHeaders(
    {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZkaWZhYmlvQHVucm4uZWR1LmFyIiwic3ViIjoyNCwiaWF0IjoxNjMxMDE2MzA4LCJleHAiOjE2MzEwMTcyMDh9.Q1mqCbXr77ZMiBP2RR7otyFnzeu4CPNe2FpK3R3cSMc`,
      ContentType: 'application/json'
    }
  );
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient,
              public router: Router) {
  }

  get loggedIn(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  isLoggedIN(): boolean {
    const token = this.token;
    return token !== null;
  }

  get token(): string | null {
    return localStorage.getItem(environment.tokenName);
  }

  login(username: string, passowrd: string): Observable<any> {
    const login = {
      username: username,
      password: passowrd
    };
    return this.http.post<any>(this.resourceUrl, login).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("Usuario y/o contraseña invalido");
      }), tap(response => {
        localStorage.setItem(environment.tokenName, response.token);
        this._loggedIn.next(true);
      }));
  }

  logout() {
    this._loggedIn.next(false);
    localStorage.removeItem(environment.tokenName);
    return this.router.navigate(['login']);
  }
}

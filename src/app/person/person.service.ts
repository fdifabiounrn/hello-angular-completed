import {Injectable} from '@angular/core';
import {Person} from "../domain/person";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class PersonService {

  private resourceUrl: string = environment.backendUrl + "persons";

  headers = new HttpHeaders(
    {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZkaWZhYmlvQHVucm4uZWR1LmFyIiwic3ViIjoyNCwiaWF0IjoxNjMxMDE2MzA4LCJleHAiOjE2MzEwMTcyMDh9.Q1mqCbXr77ZMiBP2RR7otyFnzeu4CPNe2FpK3R3cSMc`,
      ContentType: 'application/json'
    }
  );

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.resourceUrl, {headers: this.headers})
      .pipe(map(persons =>
        persons.map(p => new Person(p.id,
          p.firstName, p.lastName, p.age)
        )));
  }

  public findOne(id: number): Observable<Person | null> {
    return this.http.get<Person>(this.resourceUrl + "/" + id, {headers: this.headers})
      .pipe(
        catchError(error => {
          console.log("Error")
          return throwError("La persona no existe.");
        }),
        map(p => new Person(p.id,
          p.firstName, p.lastName, p.age)
        ));
  }

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(this.resourceUrl, person, {headers: this.headers}).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("La persona no pudo ser creada.");
      }),
      map(p => new Person(p.id,
        p.firstName, p.lastName, p.age)
      ));
  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(this.resourceUrl, person, {headers: this.headers}).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("La persona no pudo ser actualizada.");
      }),
      map(p => new Person(p.id,
        p.firstName, p.lastName, p.age)
      ));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "/" + id, {headers: this.headers})
      .pipe(
        catchError(error => {
          return throwError("La persona contiene informacion asociada.");
        }));
  }
}

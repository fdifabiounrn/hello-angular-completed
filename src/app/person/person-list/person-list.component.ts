import {Component, OnInit} from '@angular/core';
import {Person} from "../../domain/person";
import {Router} from "@angular/router";
import {PersonService} from "../../person/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'option'];
  persons: Person[] = [];
  loading: boolean = false;

  constructor(public router: Router,
              private personService: PersonService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.personService.findAll().subscribe(list => {
      this.persons = list;
      this.loading = false;
    });
  }

  goToDetail(p: Person | null) {
    if (p == null)
      this.router.navigate(['detail']);
    else
      this.router.navigate(['detail', {id: p.id}]);
  }

  delete(id: number) {
    this.loading = true;
    this.personService.delete(id).subscribe(p => {
        this.findAll()
        this.snackBar.open("La persona se elimino con exito", 'Éxito', {duration: 2000});
      },
      error => {
        this.snackBar.open(error, "Error", {duration: 2000});
        this.loading = false;
      });
  }
}

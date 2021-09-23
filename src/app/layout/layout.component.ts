import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title = 'Curso de Angular';

  public isExpanded = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}

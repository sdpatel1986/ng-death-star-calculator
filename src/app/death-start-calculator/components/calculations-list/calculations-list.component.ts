import { Component, OnInit, Input } from '@angular/core';
import { calculation } from '../../models/calculation';

@Component({
  selector: 'app-calculations-list',
  templateUrl: './calculations-list.component.html',
  styleUrls: ['./calculations-list.component.scss']
})
export class CalculationsListComponent implements OnInit {
  @Input()
  calculations: calculation[];
  constructor() { }

  ngOnInit() {
  }

  joinStrings(strings:string[]):string{
    return strings.join('/');
  }
}

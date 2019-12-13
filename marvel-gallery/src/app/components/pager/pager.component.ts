import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() page: number;
  @Input() max_page: number;
  @Input() range_page: number;
  @Output() new_page = new EventEmitter<number>();

  constructor() { 
  }

  ngOnInit() {
  }

  listNumber() {
    let liste = []; 
    const DELTA_PAGE = 10;

    this.page = this.page || 1;

    // case extremity
    if (this.page < DELTA_PAGE || this.max_page-DELTA_PAGE < this.page) {
      for (let i = 1; i<=DELTA_PAGE; i++) {
        liste.push(i);
      }
      liste.push('...');
      for (let i = this.max_page-DELTA_PAGE; i<=this.max_page; i++) {
        liste.push(i);
      }
    } else
    //case in the range
     if ((DELTA_PAGE*2) > this.page) {
       console.log('here')
      for (let i = 1; i<=(this.page+DELTA_PAGE); i++) {
        liste.push(i);
      }
      liste.push('...');
      for (let i = this.max_page-DELTA_PAGE; i<=this.max_page; i++) {
        liste.push(i);
      }
    } else 
    // Case in range
    if(this.page > this.max_page-(DELTA_PAGE*2)) {
      for (let i = 1; i<=DELTA_PAGE; i++) {
        liste.push(i);
      }
      liste.push('...');
      for (let i = this.page-DELTA_PAGE; i<=this.max_page; i++) {
        liste.push(i);
      }
    } else {
      for (let i = 1; i<=DELTA_PAGE; i++) {
        liste.push(i);
      }
      liste.push('...');
      for (let i = this.page-DELTA_PAGE; i<=this.page+DELTA_PAGE; i++) {
        liste.push(i);
      }
      liste.push('...');
      for (let i = this.max_page-DELTA_PAGE; i<=this.max_page; i++) {
        liste.push(i);
      }
    }

    return liste;
  }

  changeCurantPage(current_page) {
    console.log(current_page);
    this.new_page.emit(current_page);
  }

}

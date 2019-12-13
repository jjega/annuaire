import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { Charactere, CharactereListService } from './interfaces/characters'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarvelService]
})
export class AppComponent implements OnInit {
  public title = 'marvel-gallery';
  public characters:{};
  public max_page: number;
  public page: number;

  constructor(private _marvelService:MarvelService) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(page?:number, name?:string) {
    page = page || 1;

    this._marvelService.getCharacteres(page, name).subscribe(
          data => { 
            this.characters = data['results'];
            this.max_page   = data['totalPage'];
          },
          err => console.error(err)
        );
      
  }

  onPageSelect(page) {
    this.page = page;
    this.getCharacters(page);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ImoveisService } from '../services/imoveis.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  private dormitorios: number = 0;
  private vagas: number = 0;
  private tipo: string = "compra";
  private imoveis: any[] = [];
  private loader: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(config: NgbTabsetConfig, private imoveisService: ImoveisService) { 
    // customize default values of tabsets used by this component tree
    config.justify = 'fill';
  }

  public beforeChange($event: NgbTabChangeEvent) {
    switch($event.nextId) {
      case 'ngb-tab-0':
        this.tipo = "compra";
        this.getImoveis();
      break;
      case 'ngb-tab-1':
        this.tipo = "aluguel";
        this.getImoveis();
      break;
    }
  };

  search(term: string): void {
    this.searchTerms.next(term);
    this.vagas = 0;
    this.dormitorios = 0;
    this.getTerm();
  }

  getImoveis() {
    console.log(this.vagas, this.dormitorios, this.imoveis, this.tipo)
    this.loader = true;
    this.imoveisService
    .getArgs(this.vagas, this.dormitorios, this.tipo)
    .subscribe(data => { 
      this.imoveis = data;
      this.loader = false;
    });
  }

  getTerm() {
    this.loader = true;
    this.searchTerms
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe(term => {
        this.imoveisService.search(term, this.tipo).subscribe(data => {
          this.imoveis = data;
          this.loader = false;
        });
      }
    );
  }

  ngOnInit() {

  }

}

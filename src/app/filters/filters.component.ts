import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ImoveisService } from '../services/imoveis.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  dormitorios: number = 3;
  vagas: number = 2;
  tipo: string = "compra";
  imoveis: any[] = [];
  loader: boolean = false;

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

  ngOnInit() {
  }

}

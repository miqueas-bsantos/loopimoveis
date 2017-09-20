import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

/*Component */
import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { ListComponent } from './list/list.component';
import { LoaderComponent } from './loader/loader.component';

/*modules*/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


//services
import { ImoveisService } from './services/imoveis.service';

//pipe filters
import { LimitToPipe } from './pipe/limit-to.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    ListComponent,
    LimitToPipe,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 1800 }),
    RouterModule.forRoot([
      { path: '', component: AppComponent }
    ])
  ],
  providers: [ImoveisService],
  bootstrap: [AppComponent]
})

export class AppModule { }

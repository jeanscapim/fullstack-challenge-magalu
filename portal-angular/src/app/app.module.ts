import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)
import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { CurrencyFormatModule } from './pipes/currency-format/currency-format.module';
import { ListagemLojaComponent } from './components/loja/listagem/listagemloja.component';
import { CadastraLojaComponent } from './components/loja/cadastra/cadastraloja.component';
import { AlteraLojaComponent } from './components/loja/altera/alteraloja.component';
import { ListagemVendaComponent } from './components/venda/listagem/listagemvenda.component';
import { CadastraVendaComponent } from './components/venda/cadastra/cadastravenda.component';
import { AlteraVendaComponent } from './components/venda/altera/alteravenda.component';
import { BuscarLojaComponent } from './components/buscar/loja/buscarloja.component';
import { LojaService } from './services/loja.service';
import { VendaService } from './services/venda.service';

@NgModule({
  declarations: [
    AppComponent,
    ListagemLojaComponent,
    CadastraLojaComponent,
    AlteraLojaComponent,
    ListagemVendaComponent,
    CadastraVendaComponent,
    AlteraVendaComponent,
    BuscarLojaComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'site' }),
    RouterModule.forRoot([
      { path: 'lojas/listagem', component: ListagemLojaComponent },
      { path: 'lojas/cadastra', component: CadastraLojaComponent },
      { path: 'lojas/altera/:id', component: AlteraLojaComponent },
      { path: 'vendas/listagem/:lojas_id', component: ListagemVendaComponent },
      { path: 'vendas/cadastra/:lojas_id', component: CadastraVendaComponent },
      { path: 'vendas/altera/:id/:lojas_id', component: AlteraVendaComponent },
      { path: '', component: BuscarLojaComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CurrencyFormatModule
  ],
  providers: [
    LojaService,
    VendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

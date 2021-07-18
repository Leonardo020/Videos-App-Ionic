import { IListaFilmes } from './../models/IFilmeAPI.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  language = 'pt-BR';
  region = 'BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=0ff935ffa136af05beaed431740c7db5';

  constructor(private http: HttpClient, public toastController: ToastController) { }

  buscarFilmes(busca: string): Observable<IListaFilmes>{
    const url = `${this.apiURL}search/movie${this.key}&language=${this.language}&region=${this.region}&query=${busca}`;

    return this.http.get<IListaFilmes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API!',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }

}

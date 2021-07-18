import { IGenero } from './../models/IGenero.model';
import { GeneroService } from './../services/genero.service';
import { IListaFilmes, IFilmeApi } from './../models/IFilmeAPI.model';
import { FilmeService } from './../services/filme.service';
import { DadosService } from './../services/dados.service';
import { IFilme } from '../models/IFilme.model';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  titulo = 'Filmes';

  listaVideos: IFilme[] = [
    {
      nome: 'Viúva Negra',
      lancamento: '08/07/2021',
      duracao: '2h 26m',
      classificacao: 95,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rKq1Vlw0Bqe2EEvdmIkkkgPQAGf.jpg',
      generos: ['Heróis', 'Ação', 'Pancadaria'],
      pagina: '/viuva-negra'
    },
    {
      nome: 'Cruella',
      lancamento: '10/06/2021',
      duracao: '1h 45m',
      classificacao: 85,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ljPHd7WiPVKmuXi1hgQUpZQslbC.jpg',
      generos: ['Malvadeza', 'Deboche', 'Jaque'],
      pagina: '/cruella'
    }
  ];

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router) {}

    buscarFilmes(evento: any){
      console.log(evento.target.value);
      const busca = evento.target.value;

      if(busca && busca.trim() !== ''){
        this.filmeService.buscarFilmes(busca).subscribe(dados => {
            console.log(dados);
            this.listaFilmes = dados;
        });
      }
    }

    exibirFilme(filme: IFilmeApi){
      this.dadosService.guardarDados('filme',filme);
      this.route.navigateByUrl('/dados-filme');
    }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, favoritar!',
          handler: () => {
            this.apresentarToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionando com sucesso.',
      duration: 2000,
      color: 'tertiary',
    });
    toast.present();
  }

  ngOnInit(){
    this.generoService.buscarGeneros().subscribe(dados => {
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });
      this.dadosService.guardarDados('generos', this.generos);
    });

  }
}

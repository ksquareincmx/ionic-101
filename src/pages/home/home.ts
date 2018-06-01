import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { DetailsPage } from "../details/details";

export interface PokemonListItem {
  url: string;
  name: string;
}

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  pokemon: PokemonListItem[] = [
    // {
    //   url: "",
    //   name: "Ratata"
    // },
    // {
    //   url: "",
    //   name: "Pikachu"
    // }
  ];

  constructor(public navCtrl: NavController, public http: Http) {}

  ionViewDidLoad() {
    this.load();
  }

  load(offset: number = 0) {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        this.pokemon = this.pokemon.concat(data.results);
      });
  }

  loadMore(infiniteScroll) {
    this.load(this.pokemon.length).then(() => {
      infiniteScroll.complete();
    });
  }

  goDetail(pkmn: PokemonListItem) {
    console.log(pkmn);
    this.navCtrl.push(DetailsPage, { pokemon: pkmn });
  }
}

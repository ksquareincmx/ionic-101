import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { PokemonListItem } from "../home/home";
import "rxjs/add/operator/map";

@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage {
  pokemon: PokemonListItem;
  pkmnData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.pokemon = this.navParams.get("pokemon");
    console.log("Param:", this.pokemon);
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.http
      .get(this.pokemon.url)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        console.log(data);
        this.pkmnData = data;
      });
  }

  getIcon(type: string) {
    if (type === "fire") return "flame";
    if (type === "water") return "water";
    if (type === "bug") return "bug";
    if (type === "grass") return "leaf";
    if (type === "poison") return "flask";
    if (type === "flying") return "plane";
    if (type === "ghost") return "logo-snapchat";
    if (type === "fighting") return "bowtie";
    if (type === "normal") return "happy";
    if (type === "ground") return "logo-buffer";
    if (type === "electric") return "flash";
    if (type === "fairy") return "color-wand";
    if (type === "rock") return "globe";
    if (type === "metal") return "cog";
    if (type === "ice") return "snow";
    return "help";
  }
}

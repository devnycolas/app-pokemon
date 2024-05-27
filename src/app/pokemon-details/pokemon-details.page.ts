import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  pokemon: any;
  
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pokemonName = params['name'];
      this.getPokemonDetails(pokemonName);
    });
  }

  getPokemonDetails(name: string) {
    this.pokemonService.getPokemonDetails(name).subscribe((data: any) => {      
      this.pokemon = {
        id: data.id,
        name: data.name,
        weight: data.weight,
        height: data.height,
        base_experience: data.base_experience,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        special_attack: data.stats[3].base_stat,
        special_defense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      };
    });
  }

  getPokemonImage(pokemon: any): string {
    return pokemon?.id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` : '';
  }
}

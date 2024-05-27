import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoritePokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons() {
    const favorites = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
    this.favoritePokemons = [];
    favorites.forEach((pokemonName: string) => {
      this.pokemonService.getPokemonDetails(pokemonName).subscribe((pokemon: any) => {
        this.favoritePokemons.push(pokemon);
      });
    });
  }

  getPokemonId(pokemon: any): number {
    return pokemon.id;
  }

  getPokemonImage(pokemon: any): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  }

  openDetails(pokemon: any) {
    this.router.navigate(['/pokemon-details', pokemon.name]);
  }
}

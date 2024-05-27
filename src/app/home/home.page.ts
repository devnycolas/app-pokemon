import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  page: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';
  loading: boolean = false;


  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading = true;

    this.pokemonService.getPokemons(this.page).subscribe((data: any) => {
      const requests = data.results.map((pokemon: any) => this.pokemonService.getPokemonDetails(pokemon.name));
      forkJoin<any[]>(requests).subscribe({
        next: (details: any[]) => { // Função de callback para o próximo evento
          this.pokemons = details.map((detail: any) => ({
            name: detail.name,
            id: detail.id,
            weight: detail.weight,
            height: detail.height,
            url: detail.species.url
          }));
          this.filteredPokemons = this.pokemons;
          this.totalPages = Math.ceil(data.count / 20); // Carrega 20 itens por página
          this.loading = false;
        },
        error: (error: any) => { // Função de callback para o erro
          // Tratar o erro aqui, se necessário
          console.error(error);
          this.loading = false;
        }
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
    this.router.navigate(['/pokemon-detail', pokemon.name]);
  }

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPokemons();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPokemons();
    }
  }
}

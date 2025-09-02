// src/app/features/versus/pokemon-vs-page.component.ts
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../../services/pokemon.service';
import { TypeService } from '../../../services/type.service';


interface PokemonMini {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
  stats: { name: string; base: number }[];
  abilities: string[];
  height: number; // dm
  weight: number; // hg
}

@Component({
  selector: 'app-pokemon-vs-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokemon-vs-page.component.html',
  styleUrls: ['./pokemon-vs-page.component.css'],
})
export class PokemonVsPageComponent implements OnInit, OnDestroy {
  private readonly pokemonService = inject(PokemonService);
  private readonly typeService = inject(TypeService);

  ctrlA = new FormControl<string>('pikachu', { nonNullable: true });
  ctrlB = new FormControl<string>('charizard', { nonNullable: true });

  loadingA = false;
  loadingB = false;
  errorA: string | null = null;
  errorB: string | null = null;

  A: PokemonMini | null = null;
  B: PokemonMini | null = null;

  effAB: number | null = null; // A atacando a B
  effBA: number | null = null; // B atacando a A
  effABPerType: { attackerType: string; multiplier: number }[] = [];
  effBAPerType: { attackerType: string; multiplier: number }[] = [];

  private sub = new Subscription();

  ngOnInit(): void {
    this.loadA();
    this.loadB();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // -------------------------
  // Carga de Pokémon
  // -------------------------
  loadA(): void {
    const key = this.ctrlA.value.trim().toLowerCase();
    if (!key) return;
    this.loadingA = true;
    this.errorA = null;

    const s = this.pokemonService.getPokemonDetail(key).subscribe({
      next: (d: any) => {
        this.A = this.mapDetail(d);
        this.loadingA = false;
        this.computeEffectiveness();
      },
      error: () => {
        this.loadingA = false;
        this.errorA = 'No se encontró el Pokémon A.';
        this.A = null;
        this.effAB = null;
        this.effABPerType = [];
      },
    });
    this.sub.add(s);
  }

  loadB(): void {
    const key = this.ctrlB.value.trim().toLowerCase();
    if (!key) return;
    this.loadingB = true;
    this.errorB = null;

    const s = this.pokemonService.getPokemonDetail(key).subscribe({
      next: (d: any) => {
        this.B = this.mapDetail(d);
        this.loadingB = false;
        this.computeEffectiveness();
      },
      error: () => {
        this.loadingB = false;
        this.errorB = 'No se encontró el Pokémon B.';
        this.B = null;
        this.effBA = null;
        this.effBAPerType = [];
      },
    });
    this.sub.add(s);
  }

  private mapDetail(d: any): PokemonMini {
    const sprite =
      d?.sprites?.other?.['official-artwork']?.front_default ??
      d?.sprites?.front_default ??
      null;

    return {
      id: d.id,
      name: d.name,
      sprite,
      types: (d?.types ?? []).map((t: any) => t.type.name),
      stats: (d?.stats ?? []).map((s: any) => ({ name: s.stat.name, base: s.base_stat })),
      abilities: (d?.abilities ?? []).map((a: any) => a.ability.name),
      height: d.height ?? 0,
      weight: d.weight ?? 0,
    };
  }

  // -------------------------
  // Efectividad (usa TypeService helpers)
  // -------------------------
  private computeEffectiveness(): void {
    // Limpia si falta alguno
    if (!this.A || !this.B) return;

    const s1 = this.typeService
      .getBestOffensiveMultiplier(this.A.types, this.B.types)
      .subscribe(({ best, perType }) => {
        this.effAB = best;
        this.effABPerType = perType;
      });

    const s2 = this.typeService
      .getBestOffensiveMultiplier(this.B.types, this.A.types)
      .subscribe(({ best, perType }) => {
        this.effBA = best;
        this.effBAPerType = perType;
      });

    this.sub.add(s1);
    this.sub.add(s2);
  }

  // -------------------------
  // Helpers de UI
  // -------------------------
  totalStats(stats: { name: string; base: number }[] = []): number {
    return stats.reduce((sum, s) => sum + (s.base ?? 0), 0);
  }

  statToPercent(val: number): number {
    // Escala aprox. (máximo base stat ~255; normalicemos a 180-200 para barras útiles)
    const max = 180;
    const pct = Math.min(100, Math.round((val / max) * 100));
    return Number.isFinite(pct) ? pct : 0;
  }

  hgToKg(hg: number): number {
    return Math.round((hg / 10) * 10) / 10; // 1 hg = 0.1 kg
  }

  dmToM(dm: number): number {
    return Math.round((dm / 10) * 100) / 100; // 1 dm = 0.1 m
  }

  classForMultiplier(x: number | null): string {
    if (x == null) return '';
    if (x === 0) return 'mul zero';
    if (x < 1) return 'mul bad';
    if (x === 1) return 'mul neutral';
    if (x > 1 && x < 2) return 'mul ok';
    if (x >= 2 && x < 4) return 'mul good';
    return 'mul great';
  }
}

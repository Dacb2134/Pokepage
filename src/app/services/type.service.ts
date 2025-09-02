// src/app/services/type.service.ts
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TypeService {
  constructor(private api: ApiService) {}

  getTypeList(): Observable<any> {
    return this.api.get('type');
  }

  getTypeDetail(nameOrId: string | number): Observable<any> {
    return this.api.get(`type/${nameOrId}`);
  }

  /**
   * Calcula el multiplicador ofensivo de un tipo atacante contra una
   * combinación de tipos defensores (producto por cada tipo del defensor).
   */
  getTypeEffectivenessAgainst(attackerType: string, defenderTypes: string[]): Observable<number> {
    return this.getTypeDetail(attackerType).pipe(
      map((detail: any) => {
        const rel = detail?.damage_relations ?? {};
        const dd = (rel.double_damage_to ?? []).map((x: any) => x.name); // x2
        const hd = (rel.half_damage_to ?? []).map((x: any) => x.name);   // x0.5
        const nd = (rel.no_damage_to ?? []).map((x: any) => x.name);     // x0

        return defenderTypes.reduce((acc, def) => {
          if (nd.includes(def)) return acc * 0;
          if (dd.includes(def)) return acc * 2;
          if (hd.includes(def)) return acc * 0.5;
          return acc * 1;
        }, 1);
      })
    );
  }

  /**
   * Para una lista de tipos atacantes, devuelve el mejor multiplicador contra
   * los tipos del defensor y el detalle por cada tipo atacante.
   */
  getBestOffensiveMultiplier(
    attackerTypes: string[],
    defenderTypes: string[]
  ): Observable<{ best: number; perType: { attackerType: string; multiplier: number }[] }> {
    if (!attackerTypes?.length || !defenderTypes?.length) {
      return new Observable((obs) => {
        obs.next({ best: 1, perType: [] });
        obs.complete();
      });
    }

    const calls = attackerTypes.map((t) => this.getTypeEffectivenessAgainst(t, defenderTypes));
    return forkJoin(calls).pipe(
      map((multipliers) => {
        const perType = attackerTypes.map((attackerType, i) => ({
          attackerType,
          multiplier: multipliers[i],
        }));
        const best = perType.reduce((mx, cur) => (cur.multiplier > mx ? cur.multiplier : mx), 0);
        return { best, perType };
      })
    );
  }
}

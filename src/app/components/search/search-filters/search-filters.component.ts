import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent {
  @Output() filtersChange = new EventEmitter<{ type?: string; ability?: string }>();

  filters: { type?: string; ability?: string } = {};

  onChange(): void {
    this.filtersChange.emit({
      type: this.filters.type?.toLowerCase() || undefined,
      ability: this.filters.ability?.toLowerCase() || undefined
    });
  }
}


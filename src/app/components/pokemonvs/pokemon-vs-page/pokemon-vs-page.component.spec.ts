import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonVsPageComponent } from './pokemon-vs-page.component';

describe('PokemonVsPageComponent', () => {
  let component: PokemonVsPageComponent;
  let fixture: ComponentFixture<PokemonVsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonVsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonVsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

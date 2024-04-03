import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciarVeiculoComponent } from './anunciar-veiculo.component';

describe('AnunciarVeiculoComponent', () => {
  let component: AnunciarVeiculoComponent;
  let fixture: ComponentFixture<AnunciarVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciarVeiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnunciarVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

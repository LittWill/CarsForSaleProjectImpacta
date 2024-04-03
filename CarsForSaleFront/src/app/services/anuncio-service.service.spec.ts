import { TestBed } from '@angular/core/testing';

import { AnuncioServiceService } from './anuncio-service.service';

describe('AnuncioServiceService', () => {
  let service: AnuncioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnuncioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

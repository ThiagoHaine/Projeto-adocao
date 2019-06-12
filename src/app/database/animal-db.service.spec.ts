import { TestBed } from '@angular/core/testing';

import { AnimalDbService } from './animal-db.service';

describe('AnimalDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimalDbService = TestBed.get(AnimalDbService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FotoDbService } from './foto-db.service';

describe('FotoDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FotoDbService = TestBed.get(FotoDbService);
    expect(service).toBeTruthy();
  });
});

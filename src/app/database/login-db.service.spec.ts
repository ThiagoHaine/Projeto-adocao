import { TestBed } from '@angular/core/testing';

import { LoginDBService } from './login-db.service';

describe('LoginDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginDBService = TestBed.get(LoginDBService);
    expect(service).toBeTruthy();
  });
});

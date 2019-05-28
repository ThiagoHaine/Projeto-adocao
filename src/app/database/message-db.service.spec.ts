import { TestBed } from '@angular/core/testing';

import { MessageDbService } from './message-db.service';

describe('MessageDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageDbService = TestBed.get(MessageDbService);
    expect(service).toBeTruthy();
  });
});

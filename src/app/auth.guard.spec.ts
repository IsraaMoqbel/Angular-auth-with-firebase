import { TestBed, async, inject } from '@angular/core/testing';

import { AuthService } from './auth.guard';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should ...', inject([AuthService], (guard: AuthService) => {
    expect(guard).toBeTruthy();
  }));
});

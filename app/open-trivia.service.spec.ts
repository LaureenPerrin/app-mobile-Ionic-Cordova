import { TestBed } from '@angular/core/testing';

import { OpenTriviaService } from './open-trivia.service';

describe('OpenTriviaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenTriviaService = TestBed.get(OpenTriviaService);
    expect(service).toBeTruthy();
  });
});

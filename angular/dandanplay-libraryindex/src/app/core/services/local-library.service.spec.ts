import { TestBed } from '@angular/core/testing';

import { LocalLibraryService } from './local-library.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('LocalLibraryService', () => {
  let service: LocalLibraryService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LocalLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

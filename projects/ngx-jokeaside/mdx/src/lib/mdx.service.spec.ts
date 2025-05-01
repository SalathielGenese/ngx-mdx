import { TestBed } from '@angular/core/testing';

import { MdxService } from './mdx.service';

describe('MdxService', () => {
  let service: MdxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

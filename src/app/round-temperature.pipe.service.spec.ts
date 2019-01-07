import { TestBed } from '@angular/core/testing';

import { RoundTemperaturePipe } from './round-temperature.pipe.service';


describe('RoundTemperaturePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoundTemperaturePipe = TestBed.get(RoundTemperaturePipe);
    expect(service).toBeTruthy();
  });
});

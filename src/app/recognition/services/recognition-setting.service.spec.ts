import { TestBed } from '@angular/core/testing';

import { RecognitionSettingService } from './recognition-setting.service';

describe('RecognitionSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecognitionSettingService = TestBed.get(RecognitionSettingService);
    expect(service).toBeTruthy();
  });
});

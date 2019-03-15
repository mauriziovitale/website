import { Injectable } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecognitionSettingService } from './recognition-setting.service';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  loaded = false;
  snackBarRef;

  model: cocoSsd.ObjectDetection;

  modelSubject: BehaviorSubject<cocoSsd.ObjectDetection>;
  model$: Observable<cocoSsd.ObjectDetection>;
  modelName;
  constructor(private settingService: RecognitionSettingService) {
    this.modelSubject = new BehaviorSubject(null);
    this.model$ = this.modelSubject.asObservable();

    this.settingService.model$.subscribe((modelName) => {
      this.modelName = modelName;
      this.loaded = false;
      this.init();

    })
  }

  async init() {
    if (!this.loaded) {
      this.model = await cocoSsd.load(this.modelName);
      this.loaded = true;
    }
  }

  async detect(image: HTMLImageElement) {
    this.init();
    return this.model.detect(image);
  }

}

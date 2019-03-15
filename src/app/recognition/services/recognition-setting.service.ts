import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecognitionSettingService {

  model: BehaviorSubject<string>;
  model$: Observable<string>

  label: BehaviorSubject<boolean>;
  label$: Observable<boolean>
  box: BehaviorSubject<boolean>;
  box$: Observable<boolean>
  visibility: BehaviorSubject<boolean>;
  visibility$: Observable<boolean>
  score: BehaviorSubject<number>;
  score$: Observable<number>
  visibilityValue = false;

  constructor() {
    this.model = new BehaviorSubject('lite_mobilenet_v2');
    this.model$ = this.model.asObservable();
    this.visibility = new BehaviorSubject(this.visibilityValue);
    this.visibility$ = this.visibility.asObservable();
    this.label = new BehaviorSubject(true);
    this.label$ = this.label.asObservable();
    this.box = new BehaviorSubject(true);
    this.box$ = this.box.asObservable();
    this.score = new BehaviorSubject(0.5);
    this.score$ = this.score.asObservable();
  }

  setLabel(value: boolean) {
    this.label.next(value);
  }

  setBox(value: boolean) {
    this.box.next(value);
  }

  setScore(value: number) {
    this.score.next(value);
  }

  toggleVisibility() {
    this.visibilityValue = !this.visibilityValue;
    this.visibility.next(this.visibilityValue);
  }

  setVisibility(value: boolean) {
    this.visibilityValue = !value;
    this.visibility.next(this.visibilityValue);
  }

  setModel(name: string) {
    this.model.next(name);
  }

}

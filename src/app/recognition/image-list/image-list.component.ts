import { Component, Input, OnChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Image } from '../document/document.component';
import { RecognitionService } from '../services/recognition.service';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnChanges {
  @Input()
  query: string;

  downloadedImg;

  imageToUpdate;

  searchImagesCollection: AngularFirestoreCollection<Image>;
  resultImages: Observable<Image[]>;
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage, private recognitionService: RecognitionService) { }

  ngOnChanges() {
    // this.searchImagesCollection = this.afs.collection('images').snapshotChanges();
    this.searchImagesCollection = this.afs.collection('images', ref => {
      if (this.query !== ''){
        return ref.where('class', 'array-contains', `${this.query}`);
      }
      else {
        return ref;
      }
    })
    // this.resultImages = this.searchImagesCollection.valueChanges();
    this.resultImages = this.searchImagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  recognize(item, imageObj) {
    this.imageToUpdate = item;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageObj.src;
    img.width = 224;
    img.height = 224;
    img.onload = (img) => {
        this.rec(img.target);
    };

  }

  update() {
    const itemDoc = this.afs.doc(`images/${this.imageToUpdate.id}`);
    itemDoc.update(this.imageToUpdate);
  }

  async rec(imageObj) {
    const predictions = await this.recognitionService.detect(imageObj);
    console.log('Predictions: ' + predictions);
    let classes: String [] = [];
    predictions.forEach( (obj) => {
      classes.push(obj.class);
    })
    this.imageToUpdate.class = classes;
    this.update();

  }

  delete(id) {
    this.afStorage.ref(id).delete().subscribe( () => {
      this.afs.doc(`images/${id}`).delete().then( () => {
        console.log('deleted');
      });
    });
  }
}

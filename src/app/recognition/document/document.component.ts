import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

interface Metadata {
  cacheControl?: string,
  contentDisposition?: string,
  contentEncoding?: string,
  contentType?: string,
  contentLanguage?: string,
  customMetadata?: any
}

export interface Image {
  name: string;
  class?: string [];
  metadata?: Metadata,
  fileLocation: string;
}

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  uploadProgress: Observable<number>;

  imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;

  imageDoc: AngularFirestoreDocument<Image>;
  showImageResult = false;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.imagesCollection = this.afs.collection('images');
  }

  upload(target) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);

    const file = target.files[0];

    const imageMetadata = {
      customMetadata: {
        'location': 'London, UK, England'
      }
    }

    const tmpImage: Image = { name: file.name, class: [], metadata: imageMetadata, fileLocation: `https://firebasestorage.googleapis.com/v0/b/image-recognitions.appspot.com/o/${id}?alt=media` }
    this.task = this.ref.put(file);
    this.ref.updateMetatdata(imageMetadata);
    this.uploadProgress = this.task.percentageChanges();
    this.uploadProgress.subscribe( (progress) => {
      console.log(progress);
      if (progress === 100) {
        this.imagesCollection.doc(id).set(tmpImage);
      }
    })
  }

  search() {
    this.showImageResult = true;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { MatGridListModule, MatSnackBarModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatChipsModule } from '@angular/material';
import { AngularFireModule, FirebaseOptions } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './image-list/image-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const firebaseConfig: FirebaseOptions = environment.firebaseConfig;

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent
  }
];

console.log(firebaseConfig);

@NgModule({
  declarations: [DocumentComponent, ImageListComponent],
  imports: [
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatChipsModule,
    CommonModule
  ]
})
export class RecognitionModule { }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'platform'
})
export class QuizEditorService {
  imageList = [
    '../assets/images/theme1.jpg',
    '../assets/images/theme2.jpg',
    '../assets/images/theme3.jpg',
    '../assets/images/theme4.jpg',
  ]

  getImageList() {
    return this.imageList.slice();
  }
}

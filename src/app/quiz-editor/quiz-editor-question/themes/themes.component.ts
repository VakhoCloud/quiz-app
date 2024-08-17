import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuizEditorService } from '../../quiz-editor.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  @Input() settingsForm: FormGroup;
  @Output() toggleThemes = new EventEmitter<boolean>();
  imageList: string[]; 

  constructor(private quizEditorService: QuizEditorService) {}

  ngOnInit(): void {
    this.imageList = this.quizEditorService.getImageList();
  }

  toggleThemeTab() {
    this.toggleThemes.emit();
  }
}

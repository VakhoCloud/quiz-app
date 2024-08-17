import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuizService } from '../../quiz.service';
import { Quiz } from '../../shared/quiz.model';
import { DataStorageService } from '../../shared/data-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-editor-question',
  templateUrl: './quiz-editor-question.component.html',
  styleUrl: './quiz-editor-question.component.css'
})
export class QuizEditorQuestionComponent implements OnInit  {
  quizForm: FormGroup; 
  quiz: Quiz[];

  editMode = false;
  editId: number;

  showQuestionImageInput = false;
  showImageInput: boolean = false;

  // settings
  showSettingsTab = false;
  showThemesTab = false;

  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private dataStorageService: DataStorageService,
    private _snackBar: MatSnackBar
  )
    {}
 
  ngOnInit(): void {   
    this.quizForm = this.fb.group({
      id: '',
      title: ['', [Validators.required, Validators.minLength(5)]],
      question: this.fb.array([]),
      settings: this.fb.group({
        timerEnabled: false,
        autoCheckerEnabled: false,
        timerDuration: 0,
        backgroundImage: '',
        backButton: false,
        questionPerPage: false,
        showTitle: false,
        autoAdvance: false,
        strictMode: false
      })
    });

    this.route.params.subscribe((params: Params) => {
      const quizId = +params['id']; 
      this.editMode = params['id'] != null;

      if (this.editMode) {
        this.editId = quizId;
        const quizToEdit = this.quizService.getQuizById(quizId);
        if (quizToEdit) {
          this.quizForm.patchValue({
            id: quizToEdit.id,
            title: quizToEdit.title,
            settings: {
              timerEnabled: quizToEdit.settings.timerEnabled,
              autoCheckerEnabled: quizToEdit.settings.autoCheckerEnabled,
              timerDuration:  quizToEdit.settings.timerDuration,
              backgroundImage: quizToEdit.settings.backgroundImage,
              backButton: quizToEdit.settings.backButton,
              questionPerPage:  quizToEdit.settings.questionPerPage,
              showTitle: quizToEdit.settings.showTitle,
              autoAdvance: quizToEdit.settings.autoAdvance,
              strictMode: quizToEdit.settings.strictMode
            }
          });

          const questionFormArray = this.quizForm.get('question') as FormArray;
          quizToEdit.questions.forEach(question => {
            const questionFormGroup = this.fb.group({
              id: question.id,
              text: question.text,
              option: this.fb.array([])
            });
  
            const optionFormArray = questionFormGroup.get('option') as FormArray;
            question.options.forEach(option => {
              const optionFormGroup = this.fb.group({
                id: option.id,
                text: option.text,
                isCorrect: option.isCorrect,
                img: option.img 
              });
              optionFormArray.push(optionFormGroup);
            });
  
            questionFormArray.push(questionFormGroup);
          });
  
        };
      }
      this.quizForm.valueChanges.subscribe(console.log)
    });
    this.quizForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  get questionForm() {
    return this.quizForm.get('question') as FormArray;
  }

  get optionForm() {
    return this.questionForm.get('option') as FormArray;
  }

  get settingsForm() {
    return this.quizForm.get('settings') as FormGroup;
  }

  onAddOption(i: number) {
    const optionsArray = this.questionForm.at(i).get('option') as FormArray;
    const index = optionsArray.length;
    const option = this.fb.group({
      id: index,
      text: ['', [Validators.required]],
      isCorrect: false,
      img: null
    });
    optionsArray.push(option);
  }

  onAddQuestion(){
    const question = this.fb.group({
      id: 0,
      text: ['', [Validators.required]],
      option: this.fb.array([])
    })
    this.questionForm.push(question)
  }

  deleteQuestion(i) {
    this.questionForm.removeAt(i)
  }

  get controls() {
    return (<FormArray>this.quizForm.get('questions')).controls;
  }

  get optionControls() {
    return (this.quizForm.get('question') as FormArray).controls.map((questionControl) =>
    (questionControl.get('option') as FormArray).controls
    );
  }


  onDeleteOpiton(qIndex: number, oIndex: number) {
    const optionsArray = this.questionForm.at(qIndex).get('option') as FormArray;
    optionsArray.removeAt(oIndex);

    for (let i = qIndex; i < optionsArray.length; i++) {
      optionsArray.at(i).patchValue({ id: i });
    };

  }

  shouldDisplayAsGrid(optionsLength: number): boolean {
    return optionsLength > 2;
  }

  onSaveQuiz() {
    const editMode = this.editMode;
    this.quizService.saveQuizForm(this.quizForm, editMode, this.editId);
    this._snackBar.open('Saved Succesfuly', null, {
      duration: 3000
    })
    if (!editMode) {
      const newQuizId = this.quizService.getQuiz().length - 1;
      this.router.navigate(['/editor', newQuizId, 'edit']);
    };
    this.dataStorageService.fetchQuizzes();
    this.dataStorageService.storeQuizzes();
  }

  toggleSettingsTab() {
    this.showSettingsTab = !this.showSettingsTab;
  }

  toggleThemes() {
    this.showThemesTab = !this.showThemesTab;
  }

  toggleQuiz() { 
    this.showSettingsTab = false;
    this.showThemesTab = false;
  }

}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  @Input() settingsForm: FormGroup;
  @Output() toggleSettings = new EventEmitter<boolean>();

  constructor() {}

  toggleSettingsTab() {
    this.toggleSettings.emit();
  }
}

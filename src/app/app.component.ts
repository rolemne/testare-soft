import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';
import { LanguageServiceFactory } from './services/language/language-service.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    TranslateModule,
    MatSelectModule,
  ],
  providers: [
    LanguageServiceFactory
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  height: number = 0;
  weight: number = 0;
  result: number = 0;

  selectedLanguage = 'en';
  languageOptions: string[] = [];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.selectedLanguage;
    this.languageOptions = this.languageService.acceptedLanguages;
  }

  onSelectLanguage(event: string): void {
    this.languageService.setLanguage(event);
    this.selectedLanguage = event;
  }

  onCalculate(): void {
    if (!this.height) {
      this.result = 0;
      return;
    }

    const formula = (this.weight / Math.pow(this.height / 100, 2))
    this.result = Math.round(formula * 100) / 100;
  }
}

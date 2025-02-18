import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LANGUAGE_KEY, LanguageServiceFactory } from './services/language/language-service.config';
import { LanguageService } from './services/language/language.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [LanguageServiceFactory]
    }).compileComponents();
    localStorage.removeItem(LANGUAGE_KEY);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default language', () => {
    expect(component.selectedLanguage).toBe('en');
  });

  it('should change language on selection', () => {
    component.onSelectLanguage('fr');
    expect(component.selectedLanguage).toBe('fr');
    expect(languageService.selectedLanguage).toBe('fr');
    expect(localStorage.getItem('userLang')).toBe('fr');
  });

  it('should calculate BMI correctly', () => {
    component.height = 180;
    component.weight = 70;
    component.onCalculate();
    expect(component.result).toBeCloseTo(21.6, 1);
  });

  it('should not calculate BMI if height or weight is zero', () => {
    component.height = 0;
    component.weight = 70;
    component.onCalculate();
    expect(component.result).toBe(0);

    component.height = 180;
    component.weight = 0;
    component.onCalculate();
    expect(component.result).toBe(0);
  });

  it('should display result after calculation', () => {
    component.height = 180;
    component.weight = 70;
    component.onCalculate();
    fixture.detectChanges();
    const resultElement = fixture.debugElement.query(By.css('p'));
    expect(resultElement).toBeTruthy();
    expect(resultElement.nativeElement.textContent).toContain('21.6');
  });
});

import { LANGUAGE_KEY } from "./language-service.config";
import { LanguageService } from "./language.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TestBed } from "@angular/core/testing";

describe('LanguageService', () => {
  let service: LanguageService;
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService]
    });
    service = new LanguageService(LANGUAGE_KEY, TestBed.inject(TranslateService));
  });

  it('should return the default language', () => {
    expect(service.defaultLanguage).toEqual('en');
  });

  it('should return the default language when localStorage contains an unsupported language', () => {
    localStorage.setItem(LANGUAGE_KEY, 'gr');
    expect(service.getLanguage()).toBe('en');
  });

  it('should return the fr language if set', () => {
    localStorage.setItem(LANGUAGE_KEY, 'fr');
    expect(service.getLanguage()).toBe('fr');
  });

  it('should set a language on localStorage', () => {
    service.setLanguage('de');
    expect(localStorage.getItem(LANGUAGE_KEY)).toBe('de');
  });

  it('should not mutate the acceptedLanguage property if changed', () => {
    const languages = service.acceptedLanguages;
    languages[0] = 'it';
    expect(service.acceptedLanguages).not.toEqual(languages);
  })
});

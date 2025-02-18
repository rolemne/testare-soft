import { TranslateService } from "@ngx-translate/core";

export class LanguageService {

  private _acceptedLanguages: string[] = ['ro', 'en', 'fr', 'de'];
  private _defaultLanguage: string = 'en';

  constructor(private lsKey: string, private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLanguage);
    this.translate.addLangs(this.acceptedLanguages);
    this.translate.use(this.getLanguage());
  }

  get selectedLanguage(): string {
    return this.translate.currentLang;
  }

  get acceptedLanguages(): string[] {
    return this._acceptedLanguages.slice();
  }

  get defaultLanguage(): string {
    return this._defaultLanguage;
  }

  getLanguage(): string {
    const lng = localStorage.getItem(this.lsKey);
    if (!lng || !this.acceptedLanguages.includes(lng)) {
      return this.translate.getBrowserLang() ?? this.defaultLanguage;
    }

    return lng;
  }

  setLanguage(lng: string): void {
    localStorage.setItem(this.lsKey, lng);
    this.translate.use(lng);
  }
}

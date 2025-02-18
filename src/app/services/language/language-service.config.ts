import { Provider } from "@angular/core";
import { LanguageService } from "./language.service";
import { TranslateService } from "@ngx-translate/core";

export const LANGUAGE_KEY = 'userLang';

export const LanguageServiceFactory: Provider = ({
  provide: LanguageService,
  useFactory: (translationService: TranslateService) => new LanguageService(LANGUAGE_KEY, translationService),
  deps: [TranslateService]
});

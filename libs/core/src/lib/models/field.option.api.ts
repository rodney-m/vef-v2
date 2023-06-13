import { Observable } from 'rxjs';
import { PageRequest } from './pagination';
import { FieldOptionData } from './from-forms';

export interface FieldOptionApi {
  url: string;
  name?: string;
  value?: string;
  mapper?: (content: any[]) => FieldOptionData[];
  searcher?: (value: string) => Observable<FieldOptionData[]>;
  pageRequest?: PageRequest;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../data/API';
import { DefaultService } from './default.service';

@Injectable()
export class FileService extends DefaultService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `${API.FileServer}`);
  }
}

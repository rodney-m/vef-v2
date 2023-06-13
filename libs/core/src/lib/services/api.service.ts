import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../data/API';
import { DefaultService } from './default.service';

@Injectable({providedIn: 'root'})
export class ApiService extends DefaultService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `${API.BaseUrl}`);
  }
}

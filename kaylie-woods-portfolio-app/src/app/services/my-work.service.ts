import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyWorkService {
  constructor(private http: HttpClient) {}

  getMyJobs(): Observable<myJobs[]> {
    return this.http.get<myJobs[]>('assets/data/work.json');
  }
  
}

export interface myJobs {
    employer: string;
    role: string;
    description: string;
    workExamples: workExamples[]
}

export interface workExamples {
    id: number;
    title: string,
    description: string;
    link: string;
    linkTxt?: string;
    img?: string;
    imgAltTxt?: string;
    imgSrc?: string;
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CaseStudiesService {
  constructor(private http: HttpClient) {}

  getCaseStudies(): Observable<CaseStudies[]> {
    return this.http.get<CaseStudies[]>('assets/data/case-studies.json');
  }
}

export interface CaseStudies {
  id: number;
  myRoleText: string;
  overviewText: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  phases: Phases[];
}

export interface Phases {
  phaseTitle: string;
  phaseText: string[];
  phaseList?: string[];
  imgPaths?: string[];
  list?: string[];
}

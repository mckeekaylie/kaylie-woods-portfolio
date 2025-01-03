import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HomeService {
  constructor(private http: HttpClient) {}

  getSkills(): Observable<Skills> {
    return this.http.get<Skills>('assets/data/skills.json');
  }
}

interface Skills {
  ideate: string[],
  design: string[],
  build: string[]
}
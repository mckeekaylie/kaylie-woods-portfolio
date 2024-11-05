import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyApproachService {
  constructor(private http: HttpClient) {}

  getMyApproach(): Observable<MyApproachSections[]> {
    return this.http.get<MyApproachSections[]>('assets/data/approach.json');
  }
  
}

export interface MyApproachSections {
    id: number;
    title: string;
    text: string;
    cardText: string;
}
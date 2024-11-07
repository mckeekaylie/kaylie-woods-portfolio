import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengesProjsService {
  constructor(private http: HttpClient) {}

  getChallengesProjs(): Observable<ChallengesProjs[]> {
    return this.http.get<ChallengesProjs[]>(
      'assets/data/challenges-projs.json',
    );
  }
}

export interface ChallengesProjs {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyWorkComponent } from '../my-work/my-work.component';
import { MyJourney } from '../../enum';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavComponent, MyWorkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  myJourneyTxt = MyJourney;
}

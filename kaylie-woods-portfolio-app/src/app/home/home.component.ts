import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyWorkComponent } from '../my-work/my-work.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MyWorkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

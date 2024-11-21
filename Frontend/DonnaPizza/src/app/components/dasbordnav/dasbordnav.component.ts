import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dasbordnav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dasbordnav.component.html',
  styleUrl: './dasbordnav.component.css'
})
export class DasbordnavComponent {

}

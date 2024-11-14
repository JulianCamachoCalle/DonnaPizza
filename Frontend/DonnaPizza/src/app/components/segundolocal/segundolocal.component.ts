import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-segundolocal',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './segundolocal.component.html',
  styleUrl: './segundolocal.component.css'
})
export class SegundolocalComponent {

}

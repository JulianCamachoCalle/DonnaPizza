import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-primerlocal',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './primerlocal.component.html',
  styleUrl: './primerlocal.component.css'
})
export class PrimerlocalComponent {

}

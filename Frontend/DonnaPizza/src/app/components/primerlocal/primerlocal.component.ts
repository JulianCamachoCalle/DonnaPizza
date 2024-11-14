import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-primerlocal',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './primerlocal.component.html',
  styleUrl: './primerlocal.component.css'
})
export class PrimerlocalComponent {

}

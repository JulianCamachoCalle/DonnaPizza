import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-segundolocal',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './segundolocal.component.html',
  styleUrl: './segundolocal.component.css'
})
export class SegundolocalComponent {

}

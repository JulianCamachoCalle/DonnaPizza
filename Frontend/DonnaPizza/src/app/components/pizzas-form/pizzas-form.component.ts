import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PizzaService } from '../../services/pizza/pizza.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizzas-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './pizzas-form.component.html',
  styleUrl: './pizzas-form.component.css'
})
export class PizzasFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private pizzasService = inject(PizzaService);

  form?: FormGroup;
  pizza?: Pizza;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pizzasService.get(parseInt(id)).subscribe(pizza => {
        this.pizza = pizza;
        this.form = this.fb.group({
          nombre: [pizza.nombre, [Validators.required]],
          descripcion: [pizza.descripcion, [Validators.required]],
          precio: [pizza.precio, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
          disponible: ['1'],
        })
      })
    } else {
      this.form = this.fb.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        precio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
        disponible: ['1'],
      })
    }
  }

  save() {
    if (this.form?.invalid) {
      return;
    }

    const pizzaForm = this.form!.value;

    if (this.pizza) {
      this.pizzasService.update(this.pizza.id_pizza, pizzaForm).subscribe(() => {
        this.router.navigate(['/admin/pizzas'])
      })
    } else {
      this.pizzasService.create(pizzaForm).subscribe(() => {
        this.router.navigate(['/admin/pizzas'])
      })
    }
  }
}

// src/app/models/pizza.model.ts
export interface Pizza {
    id_pizza: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioFamiliar?: number;
    disponible: number;
}

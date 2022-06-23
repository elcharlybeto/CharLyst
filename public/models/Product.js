export class Product {
    id;
    descripcion;
    precio;
    cantidad;

    constructor(id,descripcion,precio,cantidad) {
        this.id = id;
        this.descripcion=descripcion;
        this.precio=precio;
        this.cantidad=cantidad;
    }
}
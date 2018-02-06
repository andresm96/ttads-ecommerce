import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ship'
})
export class ShipPipe implements PipeTransform {

  transform(value: boolean): any {
    if (value) {
      return 'Enviado';
    } else {
      return 'Pendiente';
    }
  }

}

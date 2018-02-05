import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: boolean): String {
    if (value) {
      return 'Admin';
    } else {
      return 'Default';
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value);
   return date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " "  + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() ;
  }

}

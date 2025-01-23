import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textAnimation',
  standalone: true
})
export class TextAnimationPipe implements PipeTransform {

  transform(value: string): string {
    let output = "";
    value.split("").forEach(l => {
      output += `<span data-text-visible="false">${l}</span>`;
    });
    return output;
  }

}

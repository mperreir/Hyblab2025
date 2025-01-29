import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textAnimation',
  standalone: true
})
export class TextAnimationPipe implements PipeTransform {

  transform(value: string): string {
    let output = "";
    let inBalise = 0;
    value.split("").forEach(l => {
      if (l === "<"){
        inBalise++;
      }else if (l === ">" && inBalise > 0){
        inBalise --;
      } else if (inBalise == 0) {
        output += `<span data-text-visible="false">${l}</span>`;
      }
    });
    return output;
  }

}

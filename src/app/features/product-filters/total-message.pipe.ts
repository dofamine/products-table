import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalMessage',
})
export class TotalMessagePipe implements PipeTransform {

  transform(amount: number): string {
    let resultMessage: string;

    if (amount > 0) {
      resultMessage = `Total: ${amount} ${amount > 1 ? 'items' : 'item'}`;
    } else {
      resultMessage = 'No products found';
    }
    return resultMessage;
  }
}

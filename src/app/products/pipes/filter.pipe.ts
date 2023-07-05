import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, propertyKey?: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    if (propertyKey) {
      return items.filter(item => item[propertyKey].toLowerCase().includes(searchText));
    } else {
      return items.filter(item => item.toLowerCase().includes(searchText));
    }
  }
}

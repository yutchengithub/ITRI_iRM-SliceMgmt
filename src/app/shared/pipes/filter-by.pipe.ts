// @2024/03/27 Add
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  // items: 要過濾的陣列
  // field: 要過濾的欄位名稱
  // value: 要匹配的值
  transform( items: any[], field: string, value: any ): any[] {
    if ( !items ) {
      return [];
    }
    return items.filter( item => item[field] === value );
  }
}

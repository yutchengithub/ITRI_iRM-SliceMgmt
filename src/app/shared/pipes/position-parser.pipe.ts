// 用於取出經度與緯度 ( 可切割兩種經緯度的格式 )  @2024/04/14 Add
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parsePosition' })
export class ParsePositionPipe implements PipeTransform {
  transform(positionStr: string): google.maps.LatLngLiteral {
    try {
      if (positionStr.includes('NaN')) {
        throw new Error('Position contains NaN');
      }
      
      let lng, lat;

      // 先嘗試使用 JSON.parse 解析位置字串
      try {
        const positionArr = JSON.parse(positionStr);
        lng = positionArr[0];
        lat = positionArr[1];
      } catch (e) {
        // 如果 JSON.parse 失敗,則嘗試使用正則表達式匹配位置字串
        const match = positionStr.match(/\(\s*(\d+\.\d+),\s*(\d+\.\d+)\s*\)/);
        if (match) {
          lng = parseFloat(match[1]);
          lat = parseFloat(match[2]);
        } else {
          throw new Error('Invalid position format');
        }
      }

      return { lat, lng };
    } catch (e) {
      console.error('Error parsing position:', e);
      return { lat: 0, lng: 0 };
    }
  }
}
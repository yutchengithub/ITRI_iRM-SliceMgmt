// main.ts 是 Angular 啟動之前所執行的檔案

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// 在全域中添加 initMap 函數
let map: google.maps.Map;
let georssLayer: google.maps.KmlLayer;

async function initMap(): Promise< void > {
  const { Map, KmlLayer } = await google.maps.importLibrary( "maps" ) as google.maps.MapsLibrary;
  map = new Map( document.getElementById("map") as HTMLElement, {
    center: { lat: 24, lng: 121 },
    zoom: 8,
    mapId: 'For_IRM_FieldMap'
  });

  // 使用原生 Google Maps API 添加 KML 圖層
  georssLayer = new KmlLayer( {
    url: 'http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss',
    map: map, // 使用創建的 Google Maps 實例
    preserveViewport: true // Preserve the current map viewport when the GeoRSS layer is loaded
  } );

  georssLayer.setMap( map );

  console.log('Google Maps is loaded and ready to use.');
}

//initMap();

// 將根據環境配置動態添加 Google Maps 腳本標籤至 <head>
function addGoogleMapApiKeyByEnvironment() {
  const head = document.getElementsByTagName('head')[0]; // 獲取 HTML 的 <head> 元素
  const mapApiKey = environment.googleMapsApiKey;        // 從環境配置中讀取 Google Maps API 密鑰
  const script = document.createElement('script');       // 創建一個 <script> 元素
  script.type = 'text/javascript';                       // 設置腳本類型
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap`; // 設置腳本的源地址，將 API 密鑰包含在內
  script.async = true;        // 異步加載 API 腳本
  script.defer = true;        // 推遲腳本執行直到 HTML 文檔解析完成
  head.appendChild( script ); // 將 <script> 元素添加至 <head> 中，這樣會加載 Google Maps 腳本
}

// 呼叫上面定義的函數，這樣做將在應用加載 ( Angular 啟動 ) 之前插入 Google Maps API 腳本
addGoogleMapApiKeyByEnvironment();

// 如果是生產環境，則啟用 Angular 的生產模式
// 生產模式會關閉 Angular 的開發者特有的一些檢查和提示，有助於提高運行性能
if ( environment.production ) {
  enableProdMode();
}

// 啟動 Angular 應用，加載 AppModule
platformBrowserDynamic()
  .bootstrapModule( AppModule )
  .catch( ( err ) => console.error( err ) ); // 如果加載過程中發生錯誤，將錯誤打印至控制台
  
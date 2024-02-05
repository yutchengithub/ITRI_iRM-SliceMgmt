// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,  // 這個標誌用於指示應用是否運行於"開發"模式

  // 這表示這是用於"開發"環境的 Google Maps API 密鑰
  googleMapsApiKey: 'AIzaSyCVtv-qR0yb1vTZd--r2IimkftRGvhNFb4', // 請自行調整成自己的KEY @12/20 Add 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

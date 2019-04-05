// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyDbltgkYDy0DC9Gy9j6cd7oneIgGRGnQO4",
      authDomain: "agregator-9b0b4.firebaseapp.com",
      databaseURL: "https://agregator-9b0b4.firebaseio.com",
      projectId: "agregator-9b0b4",
      storageBucket: "agregator-9b0b4.appspot.com",
      messagingSenderId: "1070592961845"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

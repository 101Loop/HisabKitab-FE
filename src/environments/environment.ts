// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://192.168.1.107/',
// baseUrl: 'https://y5sa0ot8y4.execute-api.ap-south-1.amazonaws.com/production/'
  apiKey: 'AIzaSyCwepaQw8OSU8fLUyHrPnLjQCIOS-1OBWI',
  authDomain: 'jyessonline.firebaseapp.com',
  databaseURL: 'https://jyessonline.firebaseio.com',
  projectId: 'jyessonline',
  storageBucket: 'jyessonline.appspot.com',
  messagingSenderId: '963057387762'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

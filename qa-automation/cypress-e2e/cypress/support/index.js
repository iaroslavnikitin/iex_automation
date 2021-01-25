/// <reference types="cypress" />


// ***********************************************************
// This example support/index.html is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

//require('cypress-plugin-retries')

// Import commands.js using ES2015 syntax:
import './commands'
import './constants'
import './user'
import './XML/at_datagen'
import './XML/um_schema'
import './XML/at_schema'
import './XML/digest'
import './XML/at_constants'
import './XML/at_functions'
import './XML/at_commands'
import './UI/member_portal_functions'
import './UI/left_navigation_verification'
import './UI/header_links_verification'
import './UI/dashboard_verification'
import './UI/eligibility_history_verification'
import './UI/enrollment_verification'
import './UI/custom_grouping'
import './UI/enrollment'
import './UI/disenrollment'
import './NV/signup'
import './utils'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Cookies.debug(false, { verbose: false })
Cypress.Cookies.defaults({
  whitelist: [
    'JSESSIONID', 
    'SESSION', 
    'SERVERIDSCREENERAPI',
    'SERVERIDWEB',
    'SERVERIDSVC'
  ]
})


/***
 * Until issue https://github.com/cypress-io/cypress/issues/95 is implemented, if your application uses fetch protocol to make Ajax requests,
 * Cypress cannot see or stub these network calls. To quickly check what requests the web application is making,
 * open DevTools Network tab and check the "type" column. If the type shows xhr, Cypress can see it. If the type
 * says fetch, Cypress cannot intercept it yet.
 */
Cypress.on('window:before:load', (win) => {
  delete win.fetch
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
    expect(err.message).exist
        //.to.include('resizeimage is not defined' || undefined)
  return false
})

// Cypress.on('window:before:load', function (win) {
//   const original = win.EventTarget.prototype.addEventListener
//
//   win.EventTarget.prototype.addEventListener = function () {
//     if (arguments && arguments[0] === 'beforeunload') {
//       return
//     }
//     return original.apply(this, arguments)
//   }
//
//   Object.defineProperty(win, 'onbeforeunload', {
//     get: function () { },
//     set: function () { }
//   })
// })

const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    addContext({ test }, `assets/videos/${Cypress.spec.name}.mp4`)
  }
})

// switch (Cypress.env('abort_strategy')) {
//   case 'run':
//     // eslint-disable-next-line no-undef
//     before(function onBeforeEach() {
//       // Skips any subsequent specs, if the run has been flagged as failed
//       cy.getCookie('has_failed_test').then(cookie => {
//         if (cookie && typeof cookie === 'object' && cookie.value === 'true') {
//           Cypress.runner.stop();
//         }
//       });
//     });
//     /* fallthrough */
//   case 'spec':
//     afterEach(function onAfterEach() {
//       // Skips all subsequent tests in a spec, and flags the whole run as failed
//       if (this.currentTest.state === 'failed') {
//         cy.setCookie('has_failed_test', 'true');
//         Cypress.runner.stop();
//       }
//     });
//     Cypress.Cookies.defaults({
//       whitelist: 'has_failed_test',
//     });
//     break;
//   default:
// }



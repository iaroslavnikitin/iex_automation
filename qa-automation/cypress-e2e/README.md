# cypress

## System Requirements

* macOS 10.9 and above (64-bit only)
* Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
* Windows 7 and above

## Software Requirements

* Node.js with npm
* IDE (Intellij, WebStorm, Visual Studio, etc.)

### Install Cypress via npm:

    $ cd /your/project/path
    
    $ npm install cypress --save-dev

NOTE: for other ways to install refer to Cypress documentation

## Running Tests

### Local with Desktop runner
     
     $ npx cypress open
     
### Local CL run 
    
    $ npx cypress run --browser chrome --spec "cypress/integration/enrollment/medical_and_dental.js"
     
for more options refer to cypress documenation:
    https://docs.cypress.io/guides/guides/command-line.html#How-to-run-commands 
    
    
## Environment configuration

Environment configuration setup is in config directory. Create json file for each environment.
Command to run in a specific environment:
   
       cypress open --env configFile=mn5qa
       
If environment variable is not provided *mnauto* is default. This can be changed in [../cypress-e2e/cypress/plugins/index.js](../cypress-e2e/cypress/plugins/index.js)

## Creating Scenarios
[Creating Scenarios](doc/CreatingScenarios.md)

## Project Execution Instructions
[ProjectExecutionInstructions](doc/ProjectExecutionInstructions.md)

## Project Installation Instructions
[ProjectInstallation](doc/ProjectInstallation.md)

## Automated Scenarios
Test Case reference:
https://docs.google.com/spreadsheets/d/1M1Jpn2oWegsxb84cUHZmVEUBifpJQ1mMN_HoZKAo5Yo/edit#gid=0

## Known issues and workarounds for headless runs in Jenkins

1. https://github.com/cypress-io/cypress/issues/3491

    **Workaround**

    On the cypress server add the next line to  (after line .outputOptions("-preset ultrafast"))
    ~/.cache/Cypress/3.x.x/Cypress/resources/app/packages/server/lib/video_capture.js
        
        .outputOptions("-vf pad=ceil(iw/2)*2:ceil(ih/2)*2")
        
1. /usr/bin/xvfb-run: line 181: npx cypress run --spec cypress/integration/regression/cic/* --env configFile=mn2auto --reporter mochawesome: No such file or directory

   **Workaround**:
   
   On the cypress server remove double quotes ("$@") from line 181 in /usr/bin/xvfb-run
    
        DISPLAY=:$SERVERNUM XAUTHORITY=$AUTHFILE $@ 2>&1

## Questions?

Cypress documentation: https://docs.cypress.io/api/api/table-of-contents.html

Cypress chatroom on gitter: https://gitter.im/cypress-io/cypress
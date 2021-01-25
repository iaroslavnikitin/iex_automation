# Creating Scenarios

1. "describe" will have the scenario details in short (It will displayed in the results report and it will the beginning of the test case)
2. Set of "it"s will make a test case and will have the details.  
3. Each "it" will have set of functions. 

### Most test cases for CiC regression have basic set of steps. Below is an example of a test scenario:

1. Generate initial AT with scenario specific parameters --> check UI
1. Enroll into Medical and/or Dental --> check UI after enrollment
1. Update AT information (i.e. APTC max amount change) --> check UI after the change

### Follow next steps to create the example scenario above:

1. Create a [/cypress/fixtures/**.json] file with parameteres specific to test scenario - [Example for fixture/**.json](../cypress/fixtures/regression/APTC_CSR_2HH.json)
1. Create a [/cypress/integration/**.js] spec - [Example for the above scenario](cypress/integration/regression/cic1/CiC_1_aptc_csr_hh2_increase_aptc_max_med_dental.js)

# Reference document for Regression test scenarios:

https://docs.google.com/spreadsheets/d/1M1Jpn2oWegsxb84cUHZmVEUBifpJQ1mMN_HoZKAo5Yo/edit#gid=0


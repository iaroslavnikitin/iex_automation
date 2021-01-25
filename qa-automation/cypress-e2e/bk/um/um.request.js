/// <reference types="Cypress" />
context('Actions', () => {
  before(() => {
    cy.logout()
  })

  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      Cypress.runner.stop()
    }
  });

  describe('Generate Random Data', () => {
    it('generate random user', () => {
      cy.generateRandomUserData()
    })
  })

  describe('navigate to main website', () => {
    it('go to home page', () => {
      cy.navigateTo();
    })

    it('click start shopping button', () => {
      cy.get('.shopbutton-wrapper > .btn').click();
    })

    it('click skip & sign-up button', () => {
      cy.get('#skip-sign-up').click();
    })
  })

  describe('fill out sign-up form', () => {
    it('enter name', () => {
      cy.get('#firstName').focus().type(cy.RAND_USER.firstName).blur();
      cy.get('#lastName').focus().type(cy.RAND_USER.lastName).blur();
    })

    it('enter email', () => {
      cy.get('#email').focus().type(cy.RAND_USER.email).blur();
      cy.get('#confirmEmail').focus().type(cy.RAND_USER.email).blur();
    })

    it('enter phone number', () => {
      cy.get('#phone1').type(cy.RAND_USER.phone[0]).wait(300)
      cy.get('#phone2').type(cy.RAND_USER.phone[1]).wait(300)
      cy.get('#phone3').type(cy.RAND_USER.phone[2]).wait(300)
    });

    it('enter ssn', () => {
      cy.get('#ssn1').type(cy.RAND_USER.ssn[0]).wait(500);
      cy.get('#ssn2').type(cy.RAND_USER.ssn[1]).wait(500);
      cy.get('#ssn3').type(cy.RAND_USER.ssn[2]).wait(500);

      cy.get('#confirmSsn1').type(cy.RAND_USER.ssn[0]).wait(500)
      cy.get('#confirmSsn2').type(cy.RAND_USER.ssn[1]).wait(500)
      cy.get('#confirmSsn3').type(cy.RAND_USER.ssn[2]).wait(500)
    });

    it('validate SSN numbers', () => {
      cy.get("#ssn1").invoke('val').should('have.length',3)
      cy.get("#ssn2").invoke('val').should('have.length', 2)
      cy.get("#ssn3").invoke('val').should('have.length', 4)

      cy.get("#confirmSsn1").invoke('val').should('have.length', 3)
      cy.get("#confirmSsn2").invoke('val').should('have.length', 2)
      cy.get("#confirmSsn3").invoke('val').should('have.length', 4)
    })

    it('enter birth date', () => {
      cy.get('#birthDate')
          .focus().wait(200)
          .type(cy.RAND_USER.dob[0]).wait(100)
          .type(cy.RAND_USER.dob[1]).wait(100)
          .type(cy.RAND_USER.dob[2]);
    })

    it('enter security question', () => {
      cy.get('#securityQuestion1').select('What was your childhood nickname?')
        .should('have.value', 'What was your childhood nickname?');
    });

    it('enter security answer', () => {
      cy.get('#securityAnswer1').type('answer');
    });

    it('enter passport', () => {
      cy.get('#password').type('ghix123#');
      cy.get('#confirmPassword').type('ghix123#');
    })

    it('check agree checkbox and submit', () => {
      cy.get('#submitbtn').should('not.be.enabled');
      cy.get('#terms').check();
    })

    it('make sure email doesn\'t exists', () => {
      cy.get('#csrftoken').then((elem) => {
        cy.request({
          method: 'POST',
          followRedirect: false,
          form: true,
          url: '/hix/account/signup/checkEmail',
          body: {
            email: cy.RAND_USER.email,
            csrftoken: elem.val()
          }
        })
        .then((resp) => {
          expect(resp.status).to.eq(200)
          // expect(resp.url).to.not.contain('error/pageExpired')
          expect(resp.body).to.eq(true)
        })
      });
    })

    it('make sure SSN/dob doesn\'t exist', () => {
      cy.get('#csrftoken').then((elem) => {
        cy.request({
          method: 'POST',
          followRedirect: false,
          form: true,
          url: '/hix/account/signup/checkSSNAndBirthDate',
          body: {
            ssn: cy.RAND_USER.ssn[0] + cy.RAND_USER.ssn[1] + cy.RAND_USER.ssn[2],
            dob: cy.RAND_USER.dob[0] + '/' + cy.RAND_USER.dob[1] + '/' + cy.RAND_USER.dob[2],
            csrftoken: elem.val()
          }
        })
        .then((resp) => {
          expect(resp.status).to.eq(200)
          expect(resp.body).to.eq('')
        })
      });
    })

    it('check if submit button enabled', () => {
      cy.get('#submitbtn').should('not.be.disabled');
    })

    it('submit make sure validation error not shown', () => {
      cy.get('#submitbtn').click();
      cy.wait(2000);
      cy.get('#ssnExists_error > .error').should('not.be.visible');
    })
  })

  describe('Fill out contact information', () => {
    it('enter contact information', () => {
      cy.get('#addressLine1').type(cy.RAND_USER.address1)
      cy.get('#addressLine2').type(cy.RAND_USER.address2)
      cy.get('#city').type(cy.RAND_USER.city)
      cy.get('#state').select(cy.RAND_USER.state[1])
      cy.get('#zipcode').type(cy.RAND_USER.zip)
      cy.wait(1000) // Wait 1s for county list to load
      cy.get('#county').select(cy.RAND_USER.county[1])
      cy.get('#recieveTypeEmailAndPostal').check()
      cy.get('#optInPaperless1095').check();
      cy.get('#submitAdditionalInfo').should('be.enabled')
    })

    it('submit contact form', () => {
      cy.get('#submitAdditionalInfo').click();
      cy.wait(1000)
      cy.get('.addressNotFoundModal > .modal-footer > .btn-primary').then(button => {
        if(button.is(":visible")) {
          button.click();
        } else {
          throw new Error('Address Dialog not shown')
        }
      })
    })
  })

  describe('Start SSAP Application', () => {
    it('start new application', () => {
      cy.get('#application_status_link').click();
    })

    it('Click: back to application', () => {
      cy.get('.margin20-b > a').click();
    })
  })

  describe('SSAP Agree to Terms and Conditions', () => {
    it('verify that cannot click save & continue w/o agreement', () => {
      cy.get('#Page_0_rightButton').click()

      cy.get('.usa-unstyled-list > li > :nth-child(1)').find('.shown').should('be.visible')
    })

    it('click terms and conditions', () => {
      cy.get('.gi-checkbox-label').click();
    })
  })

  describe('SSAP Load Page 2 and Logout', () => {
    
    it('click save & continue', () => {
      cy.get('#Page_0_rightButton').click()
    })

    it('click logout', () => {
      cy.get('#my-account').click()
      cy.wait(50)
      cy.get('#logout_01').click()
    })
  })

  describe('Login again', () => {
    it('log in', () => {
      cy.login(cy.RAND_USER.email, cy.RAND_USER.password)
    })

    it('click continue application', () => {
      cy.get('#application_status_link').click()
    })

    it('should be on RIDP verification start page', () => {
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/hix/ridp/verification')
      })
    })

    it('go back to ssap application', () => {
      cy.get('.margin20-b > a').click()
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/hix/ssap')
      })
    })
  })
});
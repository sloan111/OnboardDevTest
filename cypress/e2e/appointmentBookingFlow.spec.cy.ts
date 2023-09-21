import { generateFakeUserData } from '../support/utils';

describe('Appointment Booking Flow', () => {
  let userData;


  beforeEach(() => {
    userData = generateFakeUserData();

    cy.visit('https://onboard-dev.henrymeds.com/');
  });


  it('should book an appointment successfully', () => {
    // Find the button with the text "California" and click on it
    cy.contains('button', 'California').click();

    // Assert that the URL ends with "/?state=california"
    cy.url().should('match', /\/\?state=california$/);

    let buttonText: string;

    cy.get('.MuiButton-root', { timeout: 5000 }).first()  //wait up to 5 seconds

    //retrieve and store the button text
    cy.get('.MuiButton-root')
      .first()                      // Get the first button with the specified class
      .invoke('text')               // Retrieve its text
      .then(text => {
        buttonText = text.trim();   // Store the text in the buttonText variable
      }
      )
      .then(text => {
        console.log("Selected time: " + text)
        return text.trim();
     })
     .as('buttonText')  //Discuss promise handling pt1
     ;

    cy.get('@buttonText').then(buttonText => { //Discuss promise handling pt2
      console.log("Selected time: " + buttonText)
    });

    cy.get('.MuiButton-root')
      .first()
      .click();

    // Check that user is presented with "Next Steps" page containg appointment time
    cy.get('@buttonText').then(buttonText => { //Discuss promise handling pt2
      cy.contains(`You have a pending appointment at ${buttonText}`).should('be.visible');
    });

    // Click the "Continue" button
    cy.contains('button', 'Continue').click();

    // Assert navigation to "Contact Details" form
    cy.contains(`Contact Details`).should('be.visible');

    // Enter patient information
    cy.get('input[name=firstName]').type(userData.firstName);
    cy.get('input[name=lastName]').type(userData.lastName);
    cy.get('input[name=email]').type(userData.email);
    cy.get('input[name=dob]').type(userData.dateOfBirth);
    cy.get('input[name=phone]').type(userData.phoneNumber);

    cy.get('select').first().select(userData.sex);  //could really benefit from data-cy tags
    cy.get('select').eq(1).should('be.visible').select(userData.pronouns);

    // Click the "Continue" button
    cy.contains('button', 'Continue').click();

    // Assert navigation to "Shipping" form
    cy.contains(`Shipping`).should('be.visible');

    //Enter address information
    cy.get('input[name=addressLine1]').type(userData.addressLine1);
    cy.get('input[name=addressLine2]').type(userData.addressLine2);
    cy.get('input[name=city]').type(userData.city);
    cy.get('input[name=zip]').type(userData.zipCode);

    // Click the "Continue" button
    cy.contains('button', 'Continue').click();

    // Assert navigation to "Payment" form
    cy.contains(`Payment Method`).should('be.visible');

  });
});
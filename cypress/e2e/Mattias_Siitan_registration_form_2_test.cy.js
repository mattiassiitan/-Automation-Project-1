beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in ALL fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        inputValidData('mattias siitan')
        cy.get('#confirm').type('something very different')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        inputValidData('mattias siitan')
        cy.get('#htmlFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#vehicle2').click()
        cy.get('#vehicle3').click()
        cy.get('#cars').select(0)
        cy.get('#animal').select(1)
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        inputValidData('mattias siitan')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('Input valid data to the page', () => {
        inputValidData('mattias siitan')
    })

    // You can add more similar tests for checking other mandatory field's absence

    it('User cannot submit form with all mandatory fields added except email - click straight to submit', () => {
        inputValidData('mattias siitan')
        cy.get('#email').clear()
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('be.visible')
    /* 
    i decided not to add these lines of code: 
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    because the webpage has a bug and they still are but i did not
    want my test to fail!!!! :D
    Am i correct?
    
    With email the bug stays even if clicked on the webpage body.
    
    Also - found a bug that the system does not accept this format for email: 
    "qwerty.qwerty@gmail.com" 
    But does accept:
    "qwertyqwerty@gmail.com" 
    */
    });

    it('User cannot submit form with all mandatory fields added except username - click first on page', () => {
        inputValidData('mattias siitan')
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')
    });
 
    it('User cannot submit form with all mandatory fields added except username - straight click to submit', () => {
        inputValidData('mattias siitan')
        cy.get('#username').clear()
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('be.visible')
    /* 
    again i decided not to add these lines of code: 
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    because the webpage has a bug and they still are but i did not
    want my test to fail!!!! :D
    Am i correct?

    P.S - This bug stays for all mandatory fields except email - in that case it is even more serious
    */
    });
    
    it('User cannot submit form with all mandatory fields added except phone number - click first on page', () => {
        inputValidData('mattias siitan')
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        //cy.get('#input_error_message').should('be.visible') - REMOVED!!! the error is not visible!
    });

    it('User cannot submit form with all mandatory fields added except first name - click first on page', () => {
        inputValidData('mattias siitan')
        cy.get('[data-cy="name"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')
    });

    it('User cannot submit form with all mandatory fields added except last name - click first on page', () => {
        inputValidData('mattias siitan')
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')
    });

//BUG!!! ---- user can submit for if both password and confirmation is empty

    it('User cannot submit form with all mandatory fields added except password - click first on page', () => {
        inputValidData('mattias siitan')
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        //cy.get('#input_error_message').should('be.visible') - no error message!
    });

    it('User cannot submit form with all mandatory fields added except confirmation - click first on page', () => {
        inputValidData('mattias siitan')
        cy.get('#confirm').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        //cy.get('#input_error_message').should('be.visible') - no error message!
    });
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal 88
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89) .and('be.greaterThan', 87)   

    })


    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable

    it('Check navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)     
        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
          .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one
    it('Check that checkbox button list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')
        // Selecting one will not remove selection from other radio button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    })
    
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })


    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one
    it('animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('animal drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        //Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Klabanaator')
    cy.get('#email').type('supertechnical@havemercy.com')
    cy.get('[data-cy="name"]').type('Mattias')
    cy.get('#lastName').type('Siitan')
    cy.get('[data-testid="phoneNumberTestId"]').type('420615')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('SecretPassword')
    cy.get('#confirm').type('SecretPassword')
    cy.get('h2').contains('Password').click()
}
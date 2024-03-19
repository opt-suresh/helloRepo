/// <reference types = "cypress"/>
//import HomePage from "../pageObjects/HomePage"
describe('This is the second suite', function()
{
 before(function()  //runs once before all the tests run in the block
  {
    cy.fixture('example').then(function(data) //Deriving the data from fixtures
    {
      this.data=data
    })
   })
    it('Sample Project',function()
    {
    // cy.viewport('samsung-s10')
    // cy.viewport('ipad-mini', 'landscape')
    cy.visit(Cypress.env('url')+'/angularpractice/')
    cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
    cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength', '2') //validating the name should be morethan 2 letters
    cy.get('h4 input').should('have.value',this.data.name) //validating the text that is reflected on another page
    // cy.get('input[name="email"]').click()
    cy.get('input[name="email"]').type(this.data.email)
    cy.get('select').select(this.data.gender)
    // cy.get('div > div.alert').should('have.text', 'Email is required')
    cy.get('#exampleInputPassword1').type(this.data.password)
    cy.get('#inlineRadio2').check().should('be.checked')
    cy.get('input[id*="inlineRadio3"]').should('be.disabled') //validating the Entrepreneur radio buitton as disabled
    cy.get('input[name="bday"]').type(this.data.DOB)
    cy.get('a[href*="/angularpractice/shop"]').click()
  
    /*cy.get('h4.card-title').each(($el, index, $list) =>
    {  
        if($el.text().includes('Nokia'))          //this can be used as a part of support command also
      {
        cy.get('button.btn').eq(index).click()
      }

    })
    cy.selectProduct('Nokia Edge')     //selecting the item individually
    cy.selectProduct('Blackberry')
    */

    this.data.productName.forEach(function(element) //Driving the data from Array in Fixtures with the help of forEach loop
    {  
    cy.selectProduct(element)
    })
    // Cypress.config('defaultCommandTimeout',8000) //It is used when the timeout duration needed more for particular spec
    cy.get('li a.btn-primary').click({force: true})
    cy.removeFromCart('Samsung Note 8')  //Customized command is created for Removefrom cart
    cy.removeFromCart('Blackberry')
   
    var sum=0
    cy.get('td:nth-child(4) strong').each(($el, index, $list) =>
    {
    const amountText=$el.text()
    // cy.log($el.text())

    var res=amountText.split(" ")
    res=res[1].trim()
    cy.log(res)
    sum=Number(sum)+Number(res) 

    }).then(function()
    {
      cy.log(sum)   
    })
    cy.get('h3 strong').then(function(element)
    {
      const amount=element.text() 
      var res=amount.split(" ")
      var total=res[1].trim()
      cy.log(total)
      expect(Number(total)).to.equal(sum)
    })
    
    cy.get('.btn-success').click()
    cy.get('.validate').type('ind')
    cy.get('div.suggestions>ul:nth-child(1)').click() 
    cy.get('#checkbox2').check({force: true})
    cy.get('input[value="Purchase"]').click()
    //cy.get('div.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
    cy.get('div.alert').then(function(element)
    {
    const Text=element.text()
    expect(Text.includes("Success")).to.be.true

    })


    })

})
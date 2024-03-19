const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

describe('TestInNewUrl', ()=>{
 
  it('FirstTest', ()=>
    {
        cy.visit('https://rahulshettyacademy.com/client/')
        cy.get('section>h1.title').contains('Practice Website for ')
        cy.fixture('ShopLogin').then((data)=>
         {
           cy.get('form>div:nth-child(1)>input').type(data.Email)
           cy.get('form>div:nth-child(2)>input').type(data.Password)
           cy.get('form>input').click()
           cy.get('div>h3').contains(data.expected)
         })  
        cy.get('section>div>div:nth-child(2)>div:nth-child(2)').find('button.w-10').click()
        cy.get('section>div>div:nth-child(2)>div:nth-child(3)').find('button.w-10').click()
        cy.get('div[role="alert"]').contains('Product Added To Cart')
        cy.get('nav>ul>li:nth-child(4)').click()
        cy.get('h1').contains('My Cart') 

        var sum=0
    cy.get('li div:nth-child(2)').each(($el, index, $list) =>
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
    cy.get('ul>li:nth-child(2) span:nth-child(2)').then(function(element)
    {
      const amount=element.text() 
      var res=amount.split("$")
      var total=res[1].trim()
      cy.log(total)
      expect(Number(total)).to.equal(sum)
    })
    cy.get('ul li:nth-child(3)>button').contains('Checkout').click()
    cy.get('div.user__address>div').type('in')
    // cy.wait(2000)
    cy.get('.ta-results button').each(($el, index, $list)=>{ 
       if($el.text()===' India')
       {
        cy.wrap($el).click()
       }
    })
    cy.get('section div>a').click()
    cy.get('td>h1').contains('Thankyou for the order.')
    cy.get('table>tbody tr:nth-child(5)>button').click()

    const fileName = Cypress.config("fileServerFolder")+("/cypress/downloads/order-invoice_suresh.devineni.xlsx")
    cy.task('excelToJsonConverter', fileName).then((result)=> //task created for exceToJson conversion and read by starting node junction as the Cypress Browser engine will not support
    {
      cy.log(result.data[2].C)
	  cy.log(result.data[1].B)
    })

    cy.readFile(fileName).then((text)=>{  //readFile used for read the data directly from Exce sheet
      expect(text).to.include('IPHONE 13 PRO')
	  
    })
    })
})
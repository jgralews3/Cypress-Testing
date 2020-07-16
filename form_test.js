describe("form test", ()=>{
    it("testing inputs", ()=>{
        cy.visit('/')

        cy.get('[for="name"] > input')
        .type("Joshua Gralewski")
        .should("have.value", "Joshua Gralewski")

        cy.get('[for="email"] > input')
        .type("jgralews3@yahoo.com")
        .should("have.value", "jgralews3@yahoo.com")

        cy.get('[for="password"] > input')
        .type("password")
        .should("have.value", "password")

        cy.get('[for="terms"]>input')
        .click()
        .should("have.checked", "true")

        cy.get('button')
        .click()

        cy.get('p#output')
        .contains("Joshua Gralewski")

        cy.get('[for="password"]>input')
        .clear()

        cy.get('button')
        .click()
    })
})
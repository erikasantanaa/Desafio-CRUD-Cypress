  describe('Desafio teste de API (CRUD + LOGIN)', () => {
  const novo = Date.now()
  const usuario = {
    nome: `Erika Santanaa ${novo}`,
    email: `qa_${novo}@example.com`,
    password: '##Teste14!',
    administrador: 'true'
  }
  it('Login e captura de token', () => {
    /** Criação de usuário para login*/
    const u2 = {
      nome: `Login Test erika ${novo}-2`,
      email: `qa_${novo}_login@example.com`,
      password: 'SenhaLogin1!',
      administrador: 'true'
    }

    cy.request('POST', '/usuarios', u2).then((res) => {
      expect(res.status).to.eq(201)

      /** Realizar login */
      cy.request('POST', '/login', { email: u2.email, password: u2.password }).then((loginRes) => {
        expect(loginRes.status).to.eq(200)
        expect(loginRes.body.message).to.eq('Login realizado com sucesso')
        
        expect(loginRes.body).to.have.property('authorization')
        expect(loginRes.body.authorization).to.be.a('string').and.not.empty

        // token disponível para futuras requisições:
        const token = loginRes.body.authorization
        cy.log('Token capturado:', token)
      })
    })
  })
})
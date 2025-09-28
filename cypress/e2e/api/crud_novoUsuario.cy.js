/** Teste API */
describe('Desafio teste de API (CRUD + LOGIN)', () => {
  const novo = Date.now()
  const usuario = {
    nome: `Erika Santana ${novo}`,
    email: `qa_${novo}@example.com`,
    password: '##Teste14!',
    administrador: 'true'
  }

  /** Caso de teste*/
    it('CRUD usuário (POST, GET, PUT, DELETE', () => {
        /** Criação de usuário*/
    cy.request('POST', '/usuarios', usuario).then((createRes) => {
      expect(createRes.status).to.eq(201)
      expect(createRes.body.message).to.eq('Cadastro realizado com sucesso')
      const id = createRes.body._id
      expect(id).to.be.a('string').and.to.have.length.greaterThan(0)

       /** COnsultar pelo ID */
      cy.request('GET', `/usuarios/${id}`).then((getRes) => {
        expect(getRes.status).to.eq(200)
        expect(getRes.body._id).to.eq(id)
        expect(getRes.body.nome).to.eq(usuario.nome)
        expect(getRes.body.email).to.eq(usuario.email)

        /**Editar usuário*/
        const updated = {
          nome: `${usuario.nome} - edited`,
          email: usuario.email,
          password: 'NewPass123!',
          administrador: 'true'
        }
        cy.request('PUT', `/usuarios/${id}`, updated).then((putRes) => {
          expect(putRes.status).to.eq(200)
          expect(putRes.body.message).to.contain('Registro alterado com sucesso')

          /** Deletar usuario*/
          cy.request('DELETE', `/usuarios/${id}`).then((delRes) => {
            expect(delRes.status).to.eq(200)
            expect(delRes.body.message).to.eq('Registro excluído com sucesso')
          })
        })
      })
    })
  })
})

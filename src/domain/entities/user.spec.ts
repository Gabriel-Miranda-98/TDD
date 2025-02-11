import { User } from "./user";

describe('User entity', () => {

  it('Deve ser possível criar um usuário com ID e Nome', () => {
    const user = new User({ id: '1', name: 'John Doe' });
    expect(user.id).toBe('1');
    expect(user.name).toBe('John Doe');
  })

  it("Não deve ser possível criar um usuário sem nome", () => {
    expect(() => new User({ id: '1', name: '' })).toThrow('Nome é obrigatório');
  });
})

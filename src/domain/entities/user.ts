interface UserProps {
  id: string;
  name: string;
}

export class User {
  private readonly _id: string;
  private readonly _name: string;

  constructor({ id, name }: UserProps) {
    if (!name) {
      throw new Error('Nome é obrigatório');
    }

    this._id = id;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}

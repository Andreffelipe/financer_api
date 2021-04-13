import { v4 as uuidv4 } from 'uuid';
export class Credores {
  public readonly id!: string;
  public name!: string;
  constructor(props: Omit<Credores, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    }
    Object.freeze(this);
  }
}

//npx sequelize-cli model:generate --name Credores --attributes name:string

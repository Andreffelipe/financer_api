import { v4 as uuidv4 } from 'uuid';
export class Cartao {
  public readonly id!: string;
  public bandeira!: string
  public limite!: number
  public fecha!: string
  public vence!: string
  public conta!: string
  constructor(props: Omit<Cartao, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    }
    Object.freeze(this);
  }
}
//npx sequelize-cli model:generate --name Cartao --attributes bandeira:string,nome:string,limite:string,fecha:string,vence:string,conta:string

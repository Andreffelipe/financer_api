import { v4 as uuidv4 } from 'uuid';

export class Despesa {
  public readonly id!: string
  public descricao!: string
  public valor!: number
  public data!: string
  public observacao!: string
  public credor!: string
  public cartao!: string
  public pago!: boolean
  public mes!: string
  public credorId!: string
  public userId!: string
  public cartaoId!: string
  constructor(props: Omit<Despesa, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    }
    Object.freeze(this);
  }
}

//npx sequelize-cli model:generate --name Despesa --attributes descricao:string,valor:string,data:string,observacao:string,credor:string,cartao:string



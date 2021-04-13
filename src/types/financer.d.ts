declare namespace Financer {
  export type User = {
    id?: string
    firstName: string
    email: string
    password: string
  }
  export type Despesa = {
    id?: string
    descricao: string
    valor: number
    data: string
    observacao: string
    credor: string
    cartao: string
    pago: boolean
    mes: string
    credorId: string
    userId: string
    cartaoId: string
  }
  export type Cartao = {
    id?: string
    bandeira: string
    limite: number
    fecha: string
    vence: string
    conta: string
  }
  export type Credores = {
    id?: string;
    name: string;
  }
}

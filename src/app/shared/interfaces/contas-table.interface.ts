export interface tableHeader
  extends Array<{
    name: string;
  }> {}

export interface contasData
  extends Array<{
    descricao: string;
    dataVencimento: string;
    valor: number;
    pago: boolean;
    observacoes: string;
  }> {}

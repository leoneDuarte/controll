import mongoose, { Schema } from 'mongoose';

const ClienteSchema = new Schema(
  {
    tipoPessoa: { type: String, enum: ['PF', 'PJ'], default: 'PJ' },
    nome: { type: String, required: true },
    nomeFantasia: { type: String, default: null },
    documento: { type: String,  default: null },
    inscricaoEstadual: { type: String, default: null },
    inscricaoMunicipal: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, default: null },
    celular: { type: String, default: null },
    endereco: {
      cep: { type: String, default: null },
      logradouro: { type: String, default: null },
      numero: { type: String, default: null },
      complemento: { type: String, default: null },
      bairro: { type: String, default: null },
      cidade: { type: String, default: null },
      estado: { type: String, default: null },
      pais: { type: String, default: 'Brasil' },
    },
    vendedorResponsavel: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    observacoes: { type: String, default: null },
    ativo: { type: Boolean, default: true },
    criadoPor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    atualizadoPor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);

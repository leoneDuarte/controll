import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, default: 'user' },
    permissoes: [{ type: String }],
    telefone: { type: String, default: null },
    celular: { type: String, default: null },
    ativo: { type: Boolean, default: true },
    ultimoLogin: { type: Date, default: null },
    criadoPor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    atualizadoPor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);

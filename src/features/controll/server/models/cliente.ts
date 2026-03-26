import 'server-only';

import mongoose, { Schema } from 'mongoose';

const ClienteSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }
  },
  { timestamps: true, collection: 'clientes' }
);

export const ClienteModel =
  mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);

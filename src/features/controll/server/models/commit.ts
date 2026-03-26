import 'server-only';

import mongoose, { Schema } from 'mongoose';

const CommitSchema = new Schema(
  {
    sha: { type: String, required: true, index: true },
    autor: { type: String, required: true },
    email: { type: String, required: true, index: true },
    mensagem: { type: String, required: true },
    repo: { type: String, required: true, index: true },
    url: { type: String, required: true },
    data: { type: Date, required: true, index: true },
    adicoes: { type: Number, required: true, min: 0 },
    remocoes: { type: Number, required: true, min: 0 },
    total_alteracoes: { type: Number, required: true, min: 0 }
  },
  { timestamps: true, collection: 'commits' }
);

CommitSchema.index({ sha: 1, repo: 1 }, { unique: true });

export const CommitModel =
  mongoose.models.Commit || mongoose.model('Commit', CommitSchema);

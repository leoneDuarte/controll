import mongoose, { Schema } from 'mongoose';

const CommitSchema = new Schema(
  {
    sha: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    autor: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
    },

    mensagem: {
      type: String,
      required: true,
    },

    repo: {
      type: String,
      required: true,
      index: true,
    },

    url: {
      type: String,
      required: true,
    },

    data: {
      type: Date,
      required: true,
    },

    adicoes: {
      type: Number,
      required: true,
      min: 0,
    },

    remocoes: {
      type: Number,
      required: true,
      min: 0,
    },

    total_alteracoes: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
    collection: 'commits',
  }
);

export default mongoose.models.Commit ||
  mongoose.model('Commit', CommitSchema);

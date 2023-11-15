import mongoose from "npm:mongoose@7.6.3";
import { Tardis } from "../types.ts";

const Schema = mongoose.Schema;

const TardisSchema = new Schema(
  {
    camuflaje: { type: String, required: true },
    numero_regeneracion: { type: Number, required: true },
    ano: { type: Number, required: true },
    id_dimensiones: [{ type: Schema.Types.ObjectId, ref: "dimensiones" }]
  },
  { timestamps: true }
);

export type TardisModelType = mongoose.Document & Omit<Tardis, "id">;
export default mongoose.model<TardisModelType>("tardis", TardisSchema);
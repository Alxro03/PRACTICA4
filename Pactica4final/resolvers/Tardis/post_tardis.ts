import { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import TardisModel from "../../db/tardis.ts";
import DimensionModel from "../../db/dimension.ts";
const post_tardis = async (req: Request, res: Response) => {
    try {
        const { camuflaje, numero_regeneracion, ano , dimensiones } = req.body;
        if (!camuflaje || !numero_regeneracion || !ano || !dimensiones) {
            res.status(400).send("camuflaje, numero de regeneracion, ano y dimensiones are required");
            return;

        }
    
        const array_dimensiones = await Promise.all(dimensiones.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const aux = await DimensionModel.findById(id).exec();
                if (aux) {
                    return {id: aux._id.toString()};

                } else {
                    res.status(400).send("dimensiones not found");
                    return;
                }
            }
            else{
                res.status(400).send("dimensiones id not valid type");
                return;
            }
        }));
        const newTardis = new TardisModel({ camuflaje, numero_regeneracion, ano, id_dimensiones:dimensiones });
        await newTardis.save();
    
        res.status(200).send({
        id: newTardis._id.toString(),
            camuflaje: newTardis.camuflaje,
            numero_regeneracion: newTardis.numero_regeneracion,
            ano: newTardis.ano,
            id_dimensiones: newTardis.id_dimensiones,
        });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};
    
export default post_tardis;
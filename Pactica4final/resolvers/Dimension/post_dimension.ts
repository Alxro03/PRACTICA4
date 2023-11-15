import { Request, Response } from "npm:express@4.18.2"; 
import mongoose from "npm:mongoose@7.6.3";
import DimensionModel from "../../db/dimension.ts";
import PlanetaModel from "../../db/planeta.ts";

const post_dimension = async (req: Request, res: Response) => { 
    try {
        const {planetas} = req.body;
        if (!planetas) {
            res.status(400).send("planetas are required");
            return;
        }
    
        const array_planetas = await Promise.all(planetas.map(async (id: string) => {
            if(mongoose.Types.ObjectId.isValid(id)){
                const aux = await PlanetaModel.findById(id).exec();
                if (aux) {
                    return {id: aux._id.toString()};

                } else {
                    res.status(400).send("planetas not found");
                    return;
                }
            }
            else{
                res.status(400).send("planetas id not valid type");
                return;
            }
        }));


        const newDimension = new DimensionModel({ id_planetas:planetas });
        await newDimension.save();
    
        res.status(200).send({
            id: newDimension._id.toString(),
            id_planetas: newDimension.id_planetas 
        });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};
    
export default post_dimension;
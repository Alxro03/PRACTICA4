import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../../db/dimension.ts";

const get_dimension = async (req: Request, res: Response) => {
  
    try {
    const { id } = req.params;
    const dimension = await DimensionModel.findById(id).populate({path:"id_planetas",populate:("id_personas")}).exec();

    if (!dimension) { 
      res.status(404).send("dimension not found");
      return;
    }

    res.status(200).send({
      id: dimension._id.toString(),
      planetas: dimension.id_planetas.map(planeta => { 
        return {
          id: planeta._id.toString(),
          personas: planeta.id_personas.map(persona => {
            return {
              id: persona._id.toString(),
              nombre: persona.nombre,
            }
          })
        }
      })
    });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default get_dimension;
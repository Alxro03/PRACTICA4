import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../../db/planeta.ts";

const get_planeta = async (req: Request, res: Response) => {
  
    try {
    const { id } = req.params;
    const planeta = await PlanetaModel.findById(id).populate("id_personas").exec();

    if (!planeta) {
      res.status(404).send("planeta not found");
      return;
    }

    res.status(200).send({
      id: planeta._id.toString(),
      personas: planeta.id_personas.map(persona => {
        return {
          id: persona._id.toString(),
          nombre: persona.nombre
        }
      })
    });

    } catch (error) {
        res.status(500).send(error.message); 
        return; 
    }
};

export default get_planeta;
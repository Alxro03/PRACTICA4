import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../../db/persona.ts";

const get_persona = async (req: Request, res: Response) => {
  
    try {
    const { id } = req.params;
    const persona = await PersonaModel.findById(id).exec();

    if (!persona) {
      res.status(404).send("persona not found");
      return;
    }

    res.status(200).send({
      id: persona._id.toString(),
      nombre: persona.nombre 
    });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default get_persona;
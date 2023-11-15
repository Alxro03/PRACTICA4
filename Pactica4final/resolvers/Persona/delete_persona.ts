import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../../db/persona.ts";

const delete_persona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await PersonaModel.findByIdAndDelete(id).exec();

    if (!persona) { 
      res.status(404).send("persona not found");
      return;
    }

    res.status(200).send("persona deleted");

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default delete_persona;
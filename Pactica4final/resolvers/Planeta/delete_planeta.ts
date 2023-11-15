import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../../db/planeta.ts";
import PersonaModel from "../../db/persona.ts";

const delete_planeta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const planeta = await PlanetaModel.findByIdAndDelete(id).exec();

    if (!planeta) {
      res.status(404).send("planeta not found");
      return;
    }


    if(planeta.id_personas !== null){
      const personasIds = planeta.id_personas;
      await personasIds.forEach(async (personaId) => {
        await PersonaModel.findByIdAndDelete(personaId).exec();
      });
   }

    res.status(200).send("planeta and the personas asociated with planeta ",{id},"deleted");

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default delete_planeta;
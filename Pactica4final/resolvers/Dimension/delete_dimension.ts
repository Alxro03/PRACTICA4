import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../../db/dimension.ts"; 
import PlanetaModel from "../../db/planeta.ts"; 
import PersonaModel from "../../db/persona.ts";

const delete_dimension = async (req: Request, res: Response) => { 
  try {

    const { id } = req.params;
    const dimension = await DimensionModel.findByIdAndDelete(id).exec();

    if (!dimension) { 
      res.status(404).send("dimension not found");
      return; 
    }


    
    if(dimension.id_planetas !== null){
    const planetasIds = dimension.id_planetas;

      await Promise.all(planetasIds.map(async (planetaId) => {

        const planeta = await PlanetaModel.findByIdAndDelete(planetaId).exec();
        
        if(planeta && planeta.id_personas !== null){
          const personasIds = planeta.id_personas;
          await Promise.all(personasIds.map(async (personaId) => {
            await PersonaModel.findByIdAndDelete(personaId).exec();
          }));
        }
      }));
    }

    res.status(200).send("dimension, planetas and the personas asociated with the dimension ",{id},"deleted");

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default delete_dimension;
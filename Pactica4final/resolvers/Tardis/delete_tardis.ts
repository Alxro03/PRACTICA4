import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../../db/tardis.ts";
import DimensionModel from "../../db/dimension.ts";
import PlanetaModel from "../../db/planeta.ts";
import PersonaModel from "../../db/persona.ts";
const delete_tardis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tardis = await TardisModel.findByIdAndDelete(id).exec();

    if (!tardis) {
      res.status(404).send("tardis not found");
      return; 
    }

    if(tardis.id_dimensiones !== null){
    const dimensionesIds = tardis.id_dimensiones;

      await Promise.all(dimensionesIds.map(async (dimensionId) => {
        const dimension = await DimensionModel.findByIdAndDelete(dimensionId).exec();
        
        if(dimension && dimension.id_planetas !== null){
        const planetasIds = dimension.id_planetas;
          await Promise.all(planetasIds.map(async (planetaId) => {
            const planeta = await PlanetaModel.findByIdAndDelete(planetaId).exec();
            
            if(planeta && planeta.id_personas !== null ){
              const personasIds = planeta.id_personas;
              await Promise.all(personasIds.map(async (personaId) => {
                await PersonaModel.findByIdAndDelete(personaId).exec();
              }));
            }
          }));
        }
      }));
    
    }

    res.status(200).send("tardis,dimensiones, planetas and the personas asociated with the tardis ",{id},"deleted"); // Si se ha borrado correctamente, devuelvo un mensaje de que se ha borrado correctamente

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};
export default delete_tardis;
import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../../db/tardis.ts";
const get_tardis = async (req: Request, res: Response) => {
  
    try {
    const { id } = req.params;
    const tardis = await TardisModel.findById(id).populate({path:"id_dimensiones",populate:{path:"id_planetas",populate:{path:"id_personas"}}}).exec();

    if (!tardis) {
      res.status(404).send("tardis not found");
      return;
    }

    res.status(200).send({
      id: tardis._id.toString(),
      camuflaje: tardis.camuflaje,
      ano: tardis.ano,
      dimensiones: tardis.id_dimensiones.map(dimension => {
        return {
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
        }
      })
    });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default get_tardis;
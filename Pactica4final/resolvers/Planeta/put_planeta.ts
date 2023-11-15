import { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3"; 
import PlanetaModel from "../../db/planeta.ts"; 
import PersonaModel from "../../db/persona.ts";  
const put_planeta = async (req: Request, res: Response) => {

try {
  const { id } = req.params;
  const { personas } = req.body;
      if (!personas) {
          res.status(400).send("personas are required");
          return; 

  }

  const array_personas = await Promise.all(personas.map(async (id: string) => {
    
    if(mongoose.Types.ObjectId.isValid(id)){
        const aux = await PersonaModel.findById(id).exec();
        if (aux) {
            return {id: aux._id.toString(), nombre: aux.nombre};

        } else {
            res.status(400).send("personas not found");
            return;
        }
    }
    else{
        res.status(400).send("personas id not valid type");
        return;
    }
}));

  const updatedPlaneta = await PlanetaModel.findByIdAndUpdate(
    id ,
    { id_personas:personas },
    { new: true }

  ).exec();

  if (!updatedPlaneta) {
    res.status(404).send("Planeta not found"); 
    return; 
  }

  res.status(200).send({
    id: updatedPlaneta._id.toString(),
    
    id_personas: updatedPlaneta.id_personas
    });

  } catch (error) {
      res.status(500).send(error.message); 
      return;
  }
};

export default put_planeta;
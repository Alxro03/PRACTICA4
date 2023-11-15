import { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import DimensionModel from "../../db/dimension.ts";
import PlanetaModel from "../../db/planeta.ts";
const put_dimension = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    const { planetas } = req.body;
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

    const updatedDimension = await DimensionModel.findByIdAndUpdate(
      id ,
      { id_planetas: planetas },
      { new: true } 
    ).exec();

    if (!updatedDimension) {
      res.status(404).send("Dimension not found");
      return;
    }

    res.status(200).send({
      id: updatedDimension._id.toString(),
      id_planetas: updatedDimension.id_planetas
      });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default put_dimension;
import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../../db/persona.ts";

const post_persona = async (req: Request, res: Response) => {
    try {
        const {nombre} = req.body;
        if (!nombre) {
            res.status(400).send("nombre is required");
            return;
        }
    
        const newPersona = new PersonaModel({ nombre });
        await newPersona.save();
    
        res.status(200).send({
            id: newPersona._id.toString(),
            nombre: newPersona.nombre 
        });

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};
    
export default post_persona;
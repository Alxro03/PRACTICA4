import express from "npm:express@4.18.2"; 

const app = express();
app.use(express.json());

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; 

const env = await load(); 

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); 

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}


import mongoose from "npm:mongoose@7.6.3"; 


try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión exitosa a MongoDB");
} catch (error) {
    console.error("Error al conectar a MongoDB:", error);
}

import get_tardis from "./resolvers/Tardis/get_tardis.ts";
import post_tardis from "./resolvers/Tardis/post_tardis.ts";
import put_tardis from "./resolvers/Tardis/put_tardis.ts";
import delete_tardis from "./resolvers/Tardis/delete_tardis.ts";
import get_dimension from "./resolvers/Dimension/get_dimension.ts";
import post_dimension from "./resolvers/Dimension/post_dimension.ts";
import put_dimension from "./resolvers/Dimension/put_dimension.ts";
import delete_dimension from "./resolvers/Dimension/delete_dimension.ts";
import get_planeta from "./resolvers/Planeta/get_planeta.ts";
import post_planeta from "./resolvers/Planeta/post_planeta.ts";
import put_planeta from "./resolvers/Planeta/put_planeta.ts";
import delete_planeta from "./resolvers/Planeta/delete_planeta.ts";
import get_persona from "./resolvers/Persona/get_persona.ts";
import post_persona from "./resolvers/Persona/post_persona.ts";
import put_persona from "./resolvers/Persona/put_persona.ts";
import delete_persona from "./resolvers/Persona/delete_persona.ts";



app


.get("/api/get_tardis/:id", get_tardis) 

.post("/api/post_tardis", post_tardis) 

.put("/api/update_tardis/:id", put_tardis) 

.delete("/api/delete_tardis/:id", delete_tardis) 

.get("/api/get_dimension/:id", get_dimension)

.post("/api/post_dimension", post_dimension)

.put("/api/update_dimension/:id", put_dimension)

.delete("/api/delete_dimension/:id", delete_dimension)

.get("/api/get_planeta/:id", get_planeta)

.post("/api/post_planeta", post_planeta)

.put("/api/update_planeta/:id", put_planeta)

.delete("/api/delete_planeta/:id", delete_planeta)

.get("/api/get_persona/:id", get_persona) 

.post("/api/post_persona", post_persona)

.put("/api/update_persona/:id", put_persona)

.delete("/api/delete_persona/:id", delete_persona) 

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
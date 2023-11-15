export type Tardis = {
    camuflaje: string;
    numero_regeneracion: number;
    ano: number;
    id_dimensiones: Dimension[];
  }
  
export type Dimension = {
    id: string;
    id_planetas: Planeta[];
  };
  
export type Planeta = {
    id: string;
    id_personas: Persona[];
  };
  
export type Persona = {
    nombre: string;
    id: string;
  };
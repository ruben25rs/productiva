export interface User {
    id:number;
    nombre?:string;
    apellido_p?:string;
    apellido_m?:string;
    nombre_largo?:string;
    estatus?:number;
    telefono?:string;
    codigo?:string;
    fecha_alta?:string;
    genero?:number;
    email:string;
    empresa:string;
    tipousuario_id: number;
    profile: string;
    inicio_sesion:Date;
    final_sesion:Date;
    tiempo_conexion?:number;
   
}
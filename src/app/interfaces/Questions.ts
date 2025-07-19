export interface Questions {
     id:number;
     question:string;
     type: 'radio' | 'checkbox' | 'text';
     options:string[];
     encuesta_id: string;
}
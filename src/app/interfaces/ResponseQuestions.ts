import { Questions } from "./Questions";
import { Encuestas } from "./Encuestas";

export interface ResponseQuestions{
     value:Questions[],
     value_enc:Encuestas
}
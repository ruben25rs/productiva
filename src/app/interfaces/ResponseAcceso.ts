import { TokenU } from "./TokenU";


export interface ResponseAcceso{
     isSuccess:boolean,
     success: true,
     message: string,
     data:TokenU[]
}
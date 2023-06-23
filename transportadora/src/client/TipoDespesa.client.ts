import { TipoDespesa } from "@/model/TipoDespesa"
import axios, { AxiosInstance } from "axios"

export class TipoDespesaClient{

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/tipodespesas',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }

    public async findById(id: number )  : Promise<TipoDespesa>{
        try{
            return (await this.axiosClient.get<TipoDespesa>(`/${id}`)).data
        }catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<TipoDespesa[]> {
        try{
            return (await this.axiosClient.get<TipoDespesa[]>(``)).data
        }catch(error:any){
            return Promise.reject(error.response)
        }
        
    } 

    public async cadastrar(tipodespesa: TipoDespesa) : Promise<void> {
        try{
            return (await this.axiosClient.post(``, tipodespesa)).data
        }catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async atualizar(tipodespesa: TipoDespesa) : Promise<void> {
        try{
            return (await this.axiosClient.put(`/${tipodespesa.id}`, tipodespesa)).data        
        }catch(error:any){
            return Promise.reject(error.response)
    }
   }

   public async excluir(tipodespesa: TipoDespesa) : Promise<void> {
    try{
        return (await this.axiosClient.delete(`/${tipodespesa.id}`)).data
    }catch(error:any){
        return Promise.reject(error.response)
    }
   }


}
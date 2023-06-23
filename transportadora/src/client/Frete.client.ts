import { Frete } from "@/model/Frete"
import axios, { AxiosInstance } from "axios"

export class FreteClient{

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/fretes',
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }

    public async findById(id: number )  : Promise<Frete>{
        try{
            return (await this.axiosClient.get<Frete>(`/${id}`)).data
        }catch(error:any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<Frete[]> {
        try{
            return (await this.axiosClient.get<Frete[]>(``)).data
        }catch(error:any){
            return Promise.reject(error.response)
        }
    } 

    public async cadastrar(frete: Frete) : Promise<void> {
        try{
            return (await this.axiosClient.post(``, frete)).data
        }catch(error:any){
            console.log(error)
            return Promise.reject(error.response)
        }
    }

    public async atualizar(frete: Frete) : Promise<void> {
        try{
            return (await this.axiosClient.put(`/${frete.id}`, frete)).data        
        }catch(error:any){
            return Promise.reject(error.response)
    }
   }

   public async excluir(frete: Frete) : Promise<void> {
    try{
        return (await this.axiosClient.delete(`/${frete.id}`)).data
    }catch(error:any){
        return Promise.reject(error.response)
    }
   }

   public async statusEmTransporte(frete: Frete) : Promise<void> {
    try{
        return (await this.axiosClient.put(`/status/em_transporte/${frete.id}`, frete)).data
    }catch(error:any){
        return Promise.reject(error.response)
    }
   }

   
   public async statusInterrompido(frete: Frete) : Promise<void> {
    try{
        return (await this.axiosClient.put(`/status/interrompido/${frete.id}`, frete)).data
    }catch(error:any){
        return Promise.reject(error.response)
    }
   }


   
}
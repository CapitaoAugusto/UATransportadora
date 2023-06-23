import { AbstractEntity } from "./AbstractEntity"
import { StatusFrete } from "./enum/StatusFrete"
import { Frete } from "./Frete"
import { Usuario } from "./Usuario"

export class HistoricoFrete extends AbstractEntity{

    data!: Date
    frete!: Frete
    statusFrete!: StatusFrete
    executor!: Usuario

}
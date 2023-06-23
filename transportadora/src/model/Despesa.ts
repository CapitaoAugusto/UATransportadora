import { AbstractEntity } from "./AbstractEntity"
import { TipoDespesa } from "./TipoDespesa"
import { Usuario } from "./Usuario"
import { Frete } from "./Frete"

export class Despesa extends AbstractEntity{

    tipoDespesa!: TipoDespesa
    valor!: number
    motorista!: Usuario
    data!: Date
    aprovador!: Usuario
    frete!: Frete

}
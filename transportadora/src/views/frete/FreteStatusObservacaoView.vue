<template>
  <div style=" margin-left: 32vw; width: 35vw;">

<div class="columns">
    <div class="column" style="font-weight: bold;color: #2c3e50;">
        Observação Do Status 
    </div>
</div>
<div style="background-color: #42b983; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
    <div class="columns">
        <div class="column is-offset-1 is-10" style="font-weight: bold;color: #2c3e50;">
            <input v-model="frete.observacao" class="input" type="text" placeholder="Observação">
            <button @click="onClickCadastrar()" style="margin-top: 2vh; margin-left: 23vw;" type="submit" class="button is-primary">Salvar</button>
        </div>
    </div>
</div> 
</div>
</template>

<script lang="ts">


import { FreteClient } from '@/client/Frete.client';
import { Frete } from '@/model/Frete';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FreteObservacaoView extends Vue{
    private freteClient: FreteClient = new FreteClient()
    public frete: Frete = new Frete

    public mounted(): void {
        this.findFrete();
    }


    private async findFrete(): Promise<void> {
        try {
            this.frete = await this.freteClient.findById(parseInt(this.$route.params.id))

            if (this.frete.id == null) {
                alert('Frete não encontrado')
                window.location.href = "/frete/"
            }

        } catch (error: any) {
            console.log(error)
        }
    }


    private atualizarStatusInterrompido(): void {
        this.freteClient.statusInterrompido(this.frete).then(
            success => {
                window.location.href = "/frete/"
            },
            error => {
                console.log(error)
            }
        )
    }


   public onClickCadastrar(): void{
    this.atualizarStatusInterrompido()
   }


}

</script>

<style>

</style>
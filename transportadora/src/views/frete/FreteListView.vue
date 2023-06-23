<template>
    <div>
        <div class="columns">
            <div class="column is-3" id="texto-alinhado">
                Lista de Fretes
            </div>
            <div class="column is-2" id="bloco-botao">
                <router-link to="/cadastro" class="button is-primary"> Cadastrar</router-link>
            </div>
        </div>
        <table class="table table is-fullwidth">
                <thead class="green">
                    <tr style="background:hsl(171deg, 100%, 41%) ">
                        <th>Data</th>
                        <th>Status</th>
                        <th>Cidade Origem</th>
                        <th>Cidade Destino</th>
                        <th>Caminhao</th>
                        <th>Produto</th>
                        <th>Opção</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in freteList" :key="item.id">
                        <th>{{item.cadastro}}</th>
                        <th>
                            <span v-if="item.statusFrete === 'CARGA'" class="tag is-info">Em Carga</span>
                            <span v-if="item.statusFrete === 'EM_TRANSPORTE'" class="tag is-info">Em Transporte</span>
                            <span v-if="item.statusFrete === 'INTERROMPIDO'" class="tag is-warning">Interrompido</span>
                            <span v-if="item.statusFrete === 'DESCARGA'" class="tag is-primary"> Em Descarga</span>
                            <span v-if="item.statusFrete === 'FATURADO'" class="tag is-success">Faturado</span>
                            <span v-if="item.statusFrete === 'CANCELADO'" class="tag is-danger">Cancelado</span>
                        </th>
                        <th>{{item.cidadeOrigem.nome}}</th>
                        <th>{{item.cidadeDestino.nome}}</th>
                        <th>{{item.caminhao.placa}}</th>
                        <th>{{item.produto.nome}}</th>
                        <th>
                            <div v-if="item.statusFrete === 'CARGA'">
                                <a v-bind:href="`/statusEmTransporte/${item.id}`">
                                <button class="button is-small is-default">T</button> &nbsp;
                                </a>
                                <a v-bind:href="`/statusObservacao/${item.id}`">
                                <button clarss="button  is-small is-default">I</button> &nbsp;
                                </a>
                                <button class="button  is-small is-default">C</button>
                            </div>
                            <div v-if="item.statusFrete === 'EM_TRANSPORTE'">
                                <a v-bind:href="`/statusObservacao/${item.id}`">
                                <button class="button is-small is-default">I</button> &nbsp;
                                </a>
                                <button class="button is-small is-default">D</button>
                            </div>
                            <div v-if="item.statusFrete === 'INTERROMPIDO'">
                                <button class="button is-small is-default">CR</button> &nbsp;
                                <a v-bind:href="`/statusEmTransporte/${item.id}`">
                                <button class="button is-small is-default">T</button> &nbsp;
                                </a>
                                <button class="button is-small is-default">C</button>
                            </div>
                            <div v-if="item.statusFrete === 'DESCARGA'">
                                <button class="button is-small is-default">F</button>
                            </div>
                            <div v-if="item.statusFrete === 'FATURADO'">
                                Sem Ação
                            </div>
                            <div v-if="item.statusFrete === 'CANCELADO'">
                                <button class="button is-small is-default">CR</button> &nbsp;
                                <a v-bind:href="`/statusObservacao/${item.id}`">
                                <button class="button is-small is-default">I</button>
                                </a>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
    </div>

</template>

<script lang="ts">

import { FreteClient } from '@/client/Frete.client';
import { Frete } from '@/model/Frete';
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { RouterLink } from 'vue-router';

@Component
export default class FreteListView extends Vue {

  private freteClient: FreteClient = new FreteClient()
  public freteList: Frete[] = []
  public frete: Frete = new Frete()


  public mounted(): void{
    this.listarFretes()
  }

  private listarFretes(): void {
    this.freteClient.findAll().then(
        success => {
            this.freteList = success
        },
        error => {
            console.log(error)
        }
    )
  }
/*
  public onClickStatusEmTransporte(): void{
    this.freteClient.atualizar().then(
        success => {
            this.freteClient = success
        },
        error => {
            console.log(error)
        }
    )*/
  

  }







</script>

<style>
#texto-alinhado {

    text-align: left;
    margin-left: 10vw;
    font-weight: bold;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    position: absolute;

}

#bloco-botao {
    margin-left: 70vw;

}


#estilo-botao {
    background-color: #42b983;
    border-radius: 10px;
    width: 10vw;
    border: none;
    font-size: 16px;
    padding-bottom: 0.5vh;
    cursor: pointer;
}

</style>

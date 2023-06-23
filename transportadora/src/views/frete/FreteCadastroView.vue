<template>
    <div>
        <div class="columns">
            <div class="column" style="font-weight: bold;color: #2c3e50;">
                Cadastro de Fretes
            </div>
        </div>
        <div class="columns">
            <div class="column is-offset-4 is-2" style="background-color: #42b983; border-top-left-radius: 10px;">
                <div class="select is-fullwidth">
                    <select @change="changeEstadoOrigem($event)">
                        <option hidden disabled selected> Selecione o Estado</option>
                        <option :value="item.id" v-for="item in estadoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column  is-2" style="background-color: #42b983; border-top-right-radius: 10px;">
                <div class="select is-fullwidth">
                    <select v-model="frete.cidadeOrigem">
                        <option hidden disabled selected> Selecione a Cidade</option>
                        <option :value="item" v-for="item in cidadeOrigemList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-2" style="background-color: #42b983;">
                <div class="select is-fullwidth">
                    <select @change="changeEstadoDestino($event)">
                        <option hidden disabled selected> Selecione o Estado</option>
                        <option :value="item.id" v-for="item in estadoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column  is-2" style="background-color: #42b983;">
                <div class="select is-fullwidth">
                    <select v-model="frete.cidadeDestino">
                        <option hidden disabled selected> Selecione a Cidade</option>
                        <option :value="item" v-for="item in cidadeDestinoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #42b983;">
                <div class="select is-fullwidth">
                    <select v-model="frete.produto">
                        <option :value="item" v-for="item in produtoList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #42b983;">
                <div class="select is-fullwidth">
                    <select v-model="frete.caminhao">
                        <option :value="item" v-for="item in caminhaoList" :key="item.id">{{ item.placa }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4" style="background-color: #42b983;">
                <div class="select is-fullwidth">
                    <select v-model="frete.motorista">
                        <option :value="item" v-for="item in usuarioList" :key="item.id">{{ item.nome }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-4"
                style="background-color: #42b983; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <input class="input" type="text" v-model="frete.precoTonelada" placeholder="Preco da Tonelada">
            </div>
        </div>

        <div class="columns">
            <div class="column is-offset-4 is-6">
                <router-link to="/frete" class="button is-primary"> Voltar</router-link> &nbsp;
                <button type="submit" @click="onClickCadastrar()" class="button is-primary">Cadastrar</button>
            </div>
        </div>
    </div>



</template>


<script lang="ts">


import { CaminhaoClient } from '@/client/Caminhao.client';
import { CidadeClient } from '@/client/Cidade.client';
import { EstadoClient } from '@/client/Estado.client';
import { FreteClient } from '@/client/Frete.client';
import { ProdutoClient } from '@/client/Produto.client';
import { UsuarioClient } from '@/client/Usuario.client';
import { Caminhao } from '@/model/Caminhao';
import { Cidade } from '@/model/Cidade';
import { Estado } from '@/model/Estado';
import { Frete } from '@/model/Frete';
import { Produto } from '@/model/Produto';
import { Usuario } from '@/model/Usuario';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FreteCadastroView extends Vue {


    private freteClient: FreteClient = new FreteClient()
    private produtoClient: ProdutoClient = new ProdutoClient()
    private caminhaoClient: CaminhaoClient = new CaminhaoClient()
    private usuarioClient: UsuarioClient = new UsuarioClient()
    private estadoClient: EstadoClient = new EstadoClient()
    private cidadeClient: CidadeClient = new CidadeClient()


    public frete: Frete = new Frete()
    public produtoList: Produto[] = []
    public caminhaoList: Caminhao[] = []
    public usuarioList: Usuario[] = []
    public estadoList: Estado[] = []
    public cidadeOrigemList: Cidade[] = []
    public cidadeDestinoList: Cidade[] = []


    public mounted(): void {
        this.selectEstadoList();
        this.selectProdutoList();
        this.selectUsuarioList();
        this.selectCaminhaoList();
    }

    public onClickCadastrar(): void {

        this.freteClient.cadastrar(this.frete).then(
            success => {
                this.frete = new Frete()
                console.log('Registro cadastrado com sucesso!!!')
            },
            error => {
                console.log(error)
            }
        )
    }


    private selectProdutoList(): void {
        this.produtoClient.findAll().then(
            success => {
                this.produtoList = success
            },
            error => {
                console.log(error)
            }
        )
    }

    private selectUsuarioList(): void {
        this.usuarioClient.findAll().then(
            success => {
                this.usuarioList = success
            },
            error => {
                console.log(error)
            }
        )
    }


    private selectCaminhaoList(): void {
        this.caminhaoClient.findAll().then(
            success => {
                this.caminhaoList = success
            },
            error => {
                console.log(error)
            }
        )
    }

    private selectEstadoList(): void {
        this.estadoClient.findAll().then(
            success => {
                this.estadoList = success
            },
            error => {
                console.log(error)
            }
        )
    }

    public async changeEstadoOrigem(event: any): Promise<void> {
        this.cidadeOrigemList = await this.cidadeClient.findByEstado(event.target.value);
    }

    public async changeEstadoDestino(event: any): Promise<void> {
        this.cidadeDestinoList = await this.cidadeClient.findByEstado(event.target.value);
    }

}

</script>

<style>

</style>
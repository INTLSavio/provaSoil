import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import { api } from '../../services/api';

import { opcaoCarboidrato, opcaoProteina, opcaoRefeicao, opcaoVerdura } from '../../utils/dataSelect';

import Button from '../../components/Button';
import { Header } from '../../components/Header';
import { Card, Content, InputContainer } from './styles';

interface DadosProps {
    tipo: string;
    alimentos?: string;
    data: string;
}

export function Edicao() {

    const { id } = useParams()

    let navigate = useNavigate()
    
    const [resposta, setResposta] = useState<DadosProps>()
    const [refeicao, setRefeicao] = useState<string | undefined>('');
    const [proteina, setProteina] = useState<string | undefined>('');
    const [proteinaQtd, setProteinaQtd] = useState<string | undefined>('');
    const [carboidrato, setCarboidrato] = useState<string | undefined>('');
    const [carboidratoQtd, setCarboidratoQtd] = useState<string | undefined>('');
    const [verdura, setVerdura] = useState<string | undefined>('');
    const [verduraQtd, setVerduraQtd] = useState<string | undefined>('');

    useEffect(() => {
        async function getData() {
            const response = await (await api.get(`/refeicao/${id}`)).data

            setResposta(response[0])
        }

        getData()
    },[])

    async function handleAddNewRefeicao() {
        const dados: DadosProps = {
            tipo: '',
            alimentos: '',
            data: new Date().toLocaleDateString()
        }

        if(!refeicao) {
            alert("Entre com a refeição")
            return
        }

        if(refeicao){
            dados.tipo = refeicao

            if(!proteina && !carboidrato && !verdura){
                alert("Entre com pelo menos algum alimento")
                return
            }

            if((proteina && !proteinaQtd) ||(carboidrato && !carboidratoQtd) || (verdura && !verduraQtd)){
                alert("Entre com o valor")
                return
            }
            
            if(proteina) dados.alimentos += 'Proteína: '+proteina+' '+proteinaQtd+'g,'
            if(carboidrato) dados.alimentos += 'Carboidrato: '+carboidrato+' '+carboidratoQtd+'g,'
            if(verdura) dados.alimentos += 'Verdura: '+verdura+' '+verduraQtd+'g,'

            dados.alimentos = dados.alimentos?.substring(0, dados.alimentos.length - 1)

            await api.put(`/refeicoes/${id}`, dados);

            navigate('/listagem')
        }
        else if(!refeicao ) {
            alert("Entre com alguma refeição")
        }


    }
    return(
        <>
            <Header />
            <Content>
                <Card>
                    <h1>Editar Refeição</h1>
                    <div>
                        {resposta &&  (<><p>Tipo: {resposta.tipo}</p> <p>Data: {resposta.data}</p> </>)}
                        {resposta?.alimentos && resposta?.alimentos.split(',').map(item => <p>{item}</p>)}
                    </div>
                    <Select 
                        className="select" 
                        options={opcaoRefeicao} 
                        isClearable={true}
                        placeholder="Selecione a Refeição"
                        onChange={item => setRefeicao(item?.value)}
                    />
                    <InputContainer>
                        <Select 
                            className="select" 
                            options={opcaoProteina} 
                            isClearable={true}
                            placeholder="Selecione a Proteína"
                            onChange={item => setProteina(item?.value)}
                        />
                        {(proteina !== '' && proteina !== undefined) ? <input type="number" placeholder='Quantidade Proteína' onChange={event => setProteinaQtd(event.target.value)}/> : <></>}
                                            
                    </InputContainer>

                    <InputContainer>
                        <Select 
                            className="select" 
                            options={opcaoCarboidrato} 
                            isClearable={true}
                            placeholder="Selecione o Carboidrato"
                            onChange={item => setCarboidrato(item?.value)}
                        />
                        {(carboidrato !== '' && carboidrato !== undefined) ? <input type="number" placeholder='Quantidade Carboidrato' onChange={event => setCarboidratoQtd(event.target.value)}/> : <></>}
                    </InputContainer>

                    <InputContainer>
                        <Select 
                            className="select" 
                            options={opcaoVerdura} 
                            isClearable={true}
                            placeholder="Selecione a Verdura"
                            onChange={item => setVerdura(item?.value)}
                        />
                        {(verdura !== '' && verdura !== undefined) ? <input type="number" placeholder='Quantidade Verdura' onChange={event => setVerduraQtd(event.target.value)}/> : <></>}
                    </InputContainer>
  
                    <Button onClick={handleAddNewRefeicao}>Editar Refeição</Button>
                </Card>
            </Content>
        </>
    );
}
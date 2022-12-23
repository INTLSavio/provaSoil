import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Context } from '../../Context/AuthContext';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import Button from '../../components/Button';
import { Content, Table, Filtros } from './styles';

const option = [
    { value: 'Carboidrato', label: 'Carboidrato'},
    { value: 'Proteína', label: 'Proteína'},
    { value: 'Verdura', label: 'Verdura'}
]

export function Listagem(){

    const { loading } = useContext(Context);

    let navigate = useNavigate()

    const [vetorOriginal, setVetorOriginal] = useState([])
    const [vetor, setVetor] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(option);
    const [dataMin, setDataMin] = useState('');
    const [dataMax, setDataMax] = useState('');
    const [filtroMin, setFiltroMin] = useState('');
    const [filtroMax, setFiltroMax] = useState('');

    useEffect(() => {
        async function getData(){
            if(!loading){
                const responseData = await api.get('refeicoes')
                const responseFiltro = await api.get('filtros')

                setVetorOriginal(responseData.data)
                setVetor(responseData.data)

                if(responseFiltro.data[0].min !== null){
                    setFiltroMin(responseFiltro.data[0].min.split('/').reverse().join('/').replaceAll('/','-'))
                    setFiltroMax(responseFiltro.data[0].max.split('/').reverse().join('/').replaceAll('/','-'))
                    setDataMin(responseFiltro.data[0].min.split('/').reverse().join('/').replaceAll('/','-'))
                    setDataMax(responseFiltro.data[0].max.split('/').reverse().join('/').replaceAll('/','-'))
                }
            }
        }

        getData()
    }, [loading])

    useEffect(() => {
        function filtrar(value) {
            for(let i = 0; i < selectedOptions.length; i++){
                if(value.alimentos.includes(selectedOptions[i].value) && (new Date(value.data.split('/').reverse().join('/').replaceAll('/','-')) >= new Date(dataMin)) && (new Date(value.data.split('/').reverse().join('/').replaceAll('/','-')) <= new Date(dataMax))){
                    return value
                }
            }
        }

        setVetor(vetorOriginal.filter(filtrar))
    },[selectedOptions, dataMin, dataMax])

    async function handleDeleteRefeicao(id) {
        await api.delete(`/refeicoes/${id}`)

        navigate(0)
    }

    return(    
        <>
            <Header />
            <Content>
                <h1>Lista de Refeições</h1>
                <Filtros>
                    <div>
                        <p>Data Mínima:</p>
                        <input type="date" onChange={(event) => setDataMin(event.target.value)} defaultValue={filtroMin} />
                    </div>
                    <div>
                        <p>Data Máxima:</p>
                        <input type="date" onChange={(event) => setDataMax(event.target.value)} defaultValue={filtroMax} />
                    </div>
                    <Select 
                        className="select" 
                        options={option} 
                        isMulti={true}
                        isClearable={true}
                        closeMenuOnSelect={false}
                        placeholder="Selecione os tipos de refeições"
                        onChange={item => setSelectedOptions(item)}
                        defaultValue={selectedOptions}
                    />
                </Filtros>
                {vetorOriginal.length ? <Table>
                    <thead>
                        <tr>
                        <th>Refeição</th>
                        <th>Alimentos</th>   
                        <th>Data</th>
                        <th>Editar</th>
                        <th>Deletar</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {vetor && vetor.map(item => (
                            <tr>
                                <td>{item.tipo}</td>
                                <td>{item.alimentos.split(',').map(item => <p>{item}</p>)}</td>
                                <td>{item.data}</td>
                                <td><Button onClick={() => navigate(`/edicao/${item.id}`)}>Editar</Button></td>
                                <td><Button onClick={() => handleDeleteRefeicao(item.id)}>Deletar </Button></td>
                            </tr> 
                        ))}                
                    </tbody> 
                </Table> : <h1 style={{color: '#000'}}>Sem Dados</h1>
                }        
            </Content>
        </>
    );
}
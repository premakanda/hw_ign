import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

/*
* 1 - дописать функцию onChangeTextCallback в SuperDebouncedInput
* 2 - дописать функцию sendQuery в HW14
* 3 - дописать функцию onChangeText в HW14
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW14 в HW5/pages/JuniorPlus
* 
* Состояние сайта при вводе текста - через 1,5сек бездействия отправляется запрос на бэк, отображается текст "...ищем":
* 
* Состояние сайта при приходе ответа с бэкэнда - текст "...ищем" исчезает, список меняется на нужный результат:
* */

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test2',
            {params: {find}}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    const [find, setFind] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<string[]>([])

    const sendQuery = (value: string) => {
        setLoading(true)
        getTechs(value)
            .then((res) => {
                if(res){
                    console.log('Received techs:', res.data.techs)
                    setTechs(res.data.techs)

                }

                // делает студент
                // сохранить пришедшие данные
            })
            .catch((e) => {
            console.error('Error fetching techs:', e)
            alert(e.response?.data?.errorText || e.message)
        })
            .finally(()=>{
                setLoading(false)
            })
    }

    const onChangeText = (value: string) => {
        setFind(value)
         const params = new URLSearchParams(searchParams)
        params.set('find', value)
        setSearchParams(params)
        // делает студент

        // добавить/заменить значение в квери урла
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        // if (params.find) {
        sendQuery(params.find || '')
        setFind(params.find || '')
        // }
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div className={s.hw14} id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <SuperDebouncedInput
                className={s.input}
                    id={'hw14-super-debounced-input'}
                    value={find}
                    onChangeText={onChangeText}
                    onDebouncedChange={sendQuery}
                />

                <div id={'hw14-loading'} className={s.loading}>
                    {isLoading ? '...ищем' : <br/>}
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW14
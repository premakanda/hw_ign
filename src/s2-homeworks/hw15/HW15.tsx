import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* 
* Состояние сайта при нажатии страницы 3 - крутилка поверх таблицы пока идёт запрос на бэк (так же она должна быть при смене количества элементов на странице и переключении сортировки):
* 
* Состояние сайта при нажатии на заголовок tech - появляется иконка направления сортировки:
* 
* Состояние сайта при втором нажатии на заголовок tech - появляется иконка противоположного направления сортировки:
* 
* Состояние сайта при третьем нажатии на заголовок tech - сортировка выключается:
* 
* Состояние сайта при выборе по 10 элементов:
* 
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                if (res) {
                    setTechs(res.data.techs)
                    setTotalCount(res.data.totalCount)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage)
        setCount(newCount)
        
        sendQuery({sort, page: newPage, count: newCount})
        
        // Обновляем searchParams
        const params: {[key: string]: string} = {}
        if (sort) params.sort = sort
        params.page = newPage.toString()
        params.count = newCount.toString()
        setSearchParams(params)
        // делает студент

        // setPage(
        // setCount(

        // sendQuery(
        // setSearchParams(

        //
    }

    const onChangeSort = (newSort: string) => {
       const updatedSort = newSort
        setSort(updatedSort)
        setPage(1)
        
        sendQuery({sort: updatedSort, page: 1, count})
        
        // Обновляем searchParams
        const params: {[key: string]: string} = {}
        if (updatedSort) params.sort = updatedSort
        params.page = '1'
        params.count = count.toString()
        setSearchParams(params)
        // делает студент

        // setSort(
        // setPage(1) // при сортировке сбрасывать на 1 страницу

        // sendQuery(
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        console.log("params " , params)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...<div className={s.loader}/></div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
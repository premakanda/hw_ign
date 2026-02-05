import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStoreType} from './bll/store'
import {loadingAC, InitStateType} from './bll/loadingReducer'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import s2 from '../../s1-main/App.module.css'
import {Loader} from './Loader'

/*
* 1 - в файле loadingReducer.ts дописать типы и логику
* 2 - получить isLoading из редакса
* 3 - дописать функцию setLoading
* 4 - сделать стили в соответствии с дизайном
* */

const HW10 = () => {
    let isLoading  = useSelector<AppStoreType, boolean>(state => state.loading.isLoading)
    // useSelector, useDispatch // пишет студент
    // const isLoading = false
    const dispatch = useDispatch();
    const setLoading = () => { // пишет студент // показать крутилку на 1,5 секунд
        // dispatch
        dispatch(loadingAC(true))
        // setTimeout
        setTimeout(()=>{
            dispatch(loadingAC(false))
        },1500)
    }

    return (
        <div id={'hw10'}>
            <div className={s2.hwTitle}>Homework #10</div>

            <div className={s2.hw}>
                {isLoading ? (
                    <div id={'hw10-loading'}>
                        <Loader/>
                    </div>
                ) : (
                    <SuperButton

                    style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        minWidth: '180px'
    }}
                        className={s2.btn}
                        id={'hw10-button-start-loading'}
                        onClick={setLoading}
                    >
                        Set loading...
                    </SuperButton>
                )}
            </div>
        </div>
    )
}

export default HW10

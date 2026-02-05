import React from 'react'
import {Slider, SliderProps} from '@mui/material'

// type SliderProps = {
//     value: string
// }

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера // пишет студент
                 width: '100%',
        maxWidth: '330px',
     
                
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange

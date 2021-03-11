import React from 'react'

import {withUser} from '@/utils/hoc'

function Reg(props){
console.log("Reg.props",props);
    return (
        <div>
            Reg
        </div>
    )
}


Reg=withUser(Reg)
export default Reg;
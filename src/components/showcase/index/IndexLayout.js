import React from 'react'
import * as styles from '../../../css/index/index-layout.module.css'

export default function IndexLayout({children}) {
    return (
        <div className={`wrapper bg-grey absolute w-full overflow-y-auto ${styles.vtIndexLayout}`}>
            {children}
        </div>
    )
}
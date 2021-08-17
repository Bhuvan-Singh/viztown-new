import React from 'react'
import {Link} from 'gatsby'

import * as styles from '../../../css/index/index-navigation.module.css'

export default function Navigation({slug, listId}) {
    return (
        <div className={`relative w-full bg-processbg absolute top-0 py-2 z-10 md:flex items-center mx-auto capitalize justify-center gap-2 whitespace-nowrap lg:whitespace-normal overflow-y-hidden overflow-x-auto ${styles.vtIndexHeader}`}>
            <Link 
            to={`${slug}`} 
            className="tab--link rounded-3xl text-white px-4 text-xs font-semibold py-2 active"
            activeClassName="bg-secondary text-primary"
            >Info & Map
            </Link>

            <Link 
            to={`${slug}/actual-site`} 
            className="tab--link rounded-3xl text-white px-4 text-xs font-semibold py-2 active"
            activeClassName="bg-secondary text-primary"
            partiallyActive={true}
            >Actual Site
            </Link>

            <Link 
            to={`${slug}/fitout-interior`} 
            className="tab--link rounded-3xl text-white px-4 text-xs font-semibold py-2 active"
            activeClassName="bg-secondary text-primary"
            partiallyActive={true}>Fit-Outs & Interior
            
            </Link>

            <Link 
            to={`${slug}/space-calculator`} 
            className="tab--link rounded-3xl text-white px-4 text-xs font-semibold py-2 active"
            activeClassName="bg-secondary text-primary">Space Calculator
            </Link>
        </div>
    )
}

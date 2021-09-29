import React from 'react'
import LayoutNoFooter from '../../components/LayoutNoFooter'
import Filters from '../../components/showcase/Filters'
import Showcase from '../../components/showcase/Showcase'

export default function index() {
    return (
        <LayoutNoFooter showcase={true}>
            <Showcase/>
        </LayoutNoFooter>
    )
}

import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../IndexLayout'
import NavigationFI from './NavigationFI'

export default function FitoutInteriorView({pageContext, fullView}) {
    return (
        <IndexLayout>
            <NavigationFI slug={`/showcase/${pageContext.slug}`} listId={pageContext.id}/>
        </IndexLayout>
    )
}

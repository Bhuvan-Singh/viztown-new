import React from 'react'
import Category from './filters/Category'
import Budget from './filters/Budget'
import Location from './filters/Location'
import Type from './filters/Type'
import FilterButton from './filters/FilterButton'

export default function Filters() {
    return (
        <div className="vt-filter bg-primary">
            <div className="container mx-auto relative z-20">
                <div className="flex xl:max-w-screen-lg mx-auto items-center rounded-md bg-white vt-search-wrap shadow-md px-2 py-1 justify-between">
                    <Category />
                    <Location />
                    <Type />
                    <Budget />
                    <FilterButton />
                </div>
            </div>
        </div>
    )
}

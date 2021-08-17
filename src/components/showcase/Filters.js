import React,{useState} from 'react'
import Category from './filters/Category'
import Budget from './filters/Budget'
import Location from './filters/Location'
import Type from './filters/Type'
import FilterButton from './filters/FilterButton'

export default function Filters() {
    const [location, setLocation] = useState([]);
    const [category, setCategory] = useState('lease');
    const [type, setType] = useState([]);
    const [budget, setBudget] = useState({
        min: 0,
        max: 0
    })
    const updateLocations = (locations) => {
        setLocation(locations)
    }
    const hideVtFilterDropdowns = (e) => {
        const eleDropDown = e.target.closest(".vt-search-relative")
        if(eleDropDown === null) {
            // document.querySelector('.vt-search-relative').classList.add('hidden')
        }
    }

    return (
        <div className="vt-filter bg-primary">
            <div className="container mx-auto relative z-20">
                <div className="flex xl:max-w-screen-lg mx-auto items-center rounded-md bg-white vt-search-wrap shadow-md px-2 py-1 justify-between">
                    <Category />
                    <Location updateLocations={updateLocations} location={location}/>
                    <Type />
                    <Budget />
                    <FilterButton />
                </div>
            </div>
        </div>
    )
}

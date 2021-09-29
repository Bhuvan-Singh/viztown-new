import React from 'react';

const UnitToggle = ({onChange,currentUnit}) => {
    const isMetric = (currentUnit.name === 'metric') ? 'checked' : '';
    return(
        <div className="w-full py-1 flex space-x-8 items-center font-semibold text-xs">
            <div className="flex items-center">
                <input type="radio" onChange={onChange} name="unit" id="metric" checked={isMetric} value="metric"  className="appearance-none h-6 w-6 border-4 bg-gray-200 border-gray-200 mr-2 outline-none checked:bg-secondary rounded-full"/> <label className="text-black" htmlFor="metric">sq. ft.</label>
            </div>
            <div className="flex items-center">
                <input type="radio" onChange={onChange} name="unit" id="imperial" value="imperial" className="appearance-none h-6 w-6 border-4 bg-gray-200 border-gray-200 mr-2 outline-none checked:bg-secondary rounded-full"/> <label className="text-black" htmlFor="metric">sq. meters.</label>
            </div>
        </div>
    )
}

export default UnitToggle;
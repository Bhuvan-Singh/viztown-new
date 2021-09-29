import React from 'react';

const CalculatorGroupHeader = ({currentUnit,name, items}) => {
    let groupTotal = 0,size=0;
    items.map((item)=>{
        size = currentUnit.name === 'metric' ? item.sizeFt : item.sizeMt;
        groupTotal += size * item.qty * currentUnit.multiplier;
    })
    groupTotal = Math.round((groupTotal+ Number.EPSILON) * 100) / 100;

    return(
        <div className="w-full bg-primary flex justify-between items-center px-6 py-1 sticky top-2 text-white">
            <div className=""><h3 className="text-sm font-semibold capitalize">{name}</h3></div>
            <div className="flex items-center space-x-6">
                <h3 className="uppercase font-semibold text-sm">{name} Total</h3>
                <span className="text-sm text-secondary">{groupTotal}
                    <span className="text-sm ml-2">({currentUnit.unit})</span>
                </span>
            </div>
        </div>
    )
}

export default CalculatorGroupHeader;
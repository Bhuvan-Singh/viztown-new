import React from 'react';

const CalculatorGroupItemTotal = ({items,currentUnit}) => {
    return(
        <div className="flex flex-col space-y-4 items-center">
            {items.map((item)=>{
                const size = currentUnit.name === 'metric' ? item.sizeFt : item.sizeMt;
                const itemTotal = Math.round(((size * item.qty * currentUnit.multiplier)+ Number.EPSILON) * 100) / 100;
                return(
                    <div key={item.id} className="flex w-full items-center">
                        <h3 className="text-sm font-medium text-black capitalize text-right w-8/12">{item.name}</h3>
                        <span className="text-lg font-bold text-secondary text-right w-4/12">{itemTotal}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default CalculatorGroupItemTotal;
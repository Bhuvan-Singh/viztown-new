import React, { Fragment } from 'react';

const CalculatorCostDetail = ({currentUnit,calculatorTotal,currencySymbol,circulationFactor}) => {
    return(
        <div>
            <div className="lg:flex items-center lg:space-y-0 lg:space-x-4">
                <div className="flex-col lg:border-r border-gray-300 pr-4 border-opacity-60">
                    <span className="text-sm font-semibold">Modern Cost : </span> 
                    <div className="">
                        <span className="text-sm font-semibold mr-1">{currencySymbol}</span>
                        <span className="text-secondary font-semibold">{calculatorTotal.totalCost.modernCost}</span> 
                    </div>
                </div>
                <div className="flex-col lg:border-r border-gray-300 border-opacity-60 pr-4">
                    <span className="font-semibold text-sm">Semi Conventional Cost : </span> 
                    <div className="">
                        <span className="text-base font-semibold mr-1">{currencySymbol}</span>
                        <span className="text-secondary font-semibold">{calculatorTotal.totalCost.semiConventionalCost}</span> 
                    </div>
                </div>
                <div className="flex-col">
                    <span className="font-semibold text-sm">Coventional Cost : </span> 
                    <div className="">
                        <span className="text-base font-semibold mr-1">{currencySymbol}</span>
                        <span className="text-secondary font-semibold">{calculatorTotal.totalCost.conventionalCost}</span> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorCostDetail;
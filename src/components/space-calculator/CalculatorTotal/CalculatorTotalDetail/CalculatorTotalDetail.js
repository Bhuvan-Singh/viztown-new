import React, { Fragment } from 'react';

const CalculatorTotalDetail = ({currentUnit,calculatorTotal,currencySymbol,circulationFactor}) => {
    return(
        <Fragment>
            
            <div className="text-md font-regular space-y-4 lg:space-y-0 lg:space-x-4 text-black lg:flex  ">
                <div className="flex-col lg:border-r border-gray-300 border-opacity-60 pr-4">
                    <span className="font-semibold text-sm ">Subtotal : </span> 
                    <div className="">
                        <span className="text-secondary font-semibold">{calculatorTotal.subTotal}</span> 
                        <span className="text-sm font-semibold"> {currentUnit.unit}</span>
                    </div>
                </div>
                <div className="flex-col lg:border-r border-gray-300 border-opacity-60 pr-4">
                    <span className="font-semibold text-sm ">Circulation(<span className="font-medium w-4 text-secondary text-center">{circulationFactor*100}%</span>) : </span> 
                    
                    <div className="">
                        <span className="text-secondary font-semibold">{calculatorTotal.circulation}</span> 
                        <span className="text-sm font-semibold"> {currentUnit.unit}</span>
                    </div>
                </div>
                <div className="flex-col">
                    <span className="font-semibold text-sm ">Usable Space : </span> 
                    <div className="">
                        <span className="text-secondary font-semibold">{calculatorTotal.usableSpace}</span> 
                        <span className="text-sm font-semibold"> {currentUnit.unit}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CalculatorTotalDetail;
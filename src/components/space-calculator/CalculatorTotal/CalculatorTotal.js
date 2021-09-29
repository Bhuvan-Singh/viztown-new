import React from 'react';
import CalculatorSubtotal from './CalculatorSubtotal/CalculatorSubtotal';
import CalculatorTotalDetail from './CalculatorTotalDetail/CalculatorTotalDetail';
import CalculatorCostDetail from './CalculatorTotalDetail/CalculatorCostDetails';

const CalculatorTotal = ({currentUnit,calculatorTotal,currencySymbol,calculatorGroups, minCheck,circulationFactor}) => {
    let calculatorTotalWrapper = '';
    if(minCheck){
        calculatorTotalWrapper = 
        <div className="flex flex-col gap-4 lg:gap-6 bg-white ">
            <div className="bg-white w-full py-6 px-4 bottom-0 md:flex space-y-6 lg:space-y-0 lg:space-x-8 rounded-sm items-center border-t-2 border-grey">
                <CalculatorSubtotal text="Space Calculator" currentUnit={currentUnit} calculatorGroups={calculatorGroups} calculatorTotal={calculatorTotal} minCheck={minCheck} />
                <CalculatorTotalDetail currencySymbol={currencySymbol} calculatorTotal={calculatorTotal} currentUnit={currentUnit} circulationFactor={circulationFactor}/>
            </div>
            <div className="bg-white w-full py-6 px-4 bottom-0 md:flex space-y-6 lg:space-y-0 lg:space-x-8 rounded-sm items-center border-t border-grey border-dashed">
                <CalculatorSubtotal text="BoQ Calculator" currentUnit={currentUnit} calculatorGroups={calculatorGroups} calculatorTotal={calculatorTotal} minCheck={minCheck} />
                <CalculatorCostDetail currencySymbol={currencySymbol} calculatorTotal={calculatorTotal} currentUnit={currentUnit} circulationFactor={circulationFactor}/>
            </div>
        </div>
    }
    return(
        calculatorTotalWrapper
    )
}

export default CalculatorTotal;
import React from 'react';
import Download from '../../Download/Download';

const CalculatorSubtotal = ({currentUnit,calculatorGroups,minCheck,calculatorTotal, text}) => {
    return(
        <div className="">
            <h3 className="text-md font-bold mb-3 capitalize">{text}</h3>
            <Download calculatorTotal={calculatorTotal} minCheck={minCheck} currentUnit={currentUnit} calculatorGroups={calculatorGroups}/>
        </div>
    )
}

export default CalculatorSubtotal;
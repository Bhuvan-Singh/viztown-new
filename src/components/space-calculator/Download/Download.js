import {CSVLink} from 'react-csv';
import React from 'react';

const Download = ({currentUnit, calculatorGroups, minCheck, calculatorTotal}) => {
    const circulationFactor = 0.35;
    
    const csvData = [];
    const csvHeader = ["Space Type", "Size", "Qty", currentUnit.unit ]
    const csvFooterCols = [
        ['','','',''],
        ['','','',''],
        ['Subtotal','','',calculatorTotal.subTotal],
        [`Circulation ${circulationFactor*100}%`,'','',calculatorTotal.circulation],
        ['Usable Space','','',calculatorTotal.usableSpace],
        ['Modern Cost','','',calculatorTotal.totalCost.modernCost],
        ['Semi Conventional Cost','','',calculatorTotal.totalCost.semiConventionalCost],
        ['Conventional Cost','','',calculatorTotal.totalCost.conventionalCost]
    ];
    csvData.push(csvHeader);
    //Adding Current Items To csvData
    calculatorGroups.map((group)=>{
        const groupName = group.name;
        group.items.map((item)=>{
            let csvBodyItem = [];
            if(item.qty>0){
                const size = currentUnit.name === 'metric' ? item.sizeFt : item.sizeMt;
                csvBodyItem.push(`${groupName} : ${item.name}`);
                csvBodyItem.push(`${size * currentUnit.multiplier}`);
                csvBodyItem.push(item.qty);
                csvBodyItem.push(size * currentUnit.multiplier * item.qty);
                csvData.push(csvBodyItem);
            }
        })
    })

    csvFooterCols.map((col)=>{
        csvData.push(col);
    })
    

    //Adding Total TO csvData
    const minCheckHandler = () => {
        if(minCheck){
            return true;
        }else{
            alert('Please select atleast 1 quantity!');
            return false;
        }
    }

    return(
        <CSVLink  onClick={minCheckHandler} filename={"space-calculator.csv"} className="flex items-center uppercase font-bold text-xs bg-secondary py-3 px-3 text-black group hover:opacity-80 flex-shrink-0 hover:text-primary lg:w-40 justify-center" data={csvData}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV    
        </CSVLink>
    )
}

export default Download;
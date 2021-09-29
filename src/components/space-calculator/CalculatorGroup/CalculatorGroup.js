import React from 'react';
import CalculatorGroupHeader from './CalculatorGroupHeader/CalculatorGroupHeader';
import CalculatorGroupItems from './CalculatorGroupItems/CalculatorGroupItems';
import CalculatorGroupItemTotal from './CalculatorGroupItemTotal/CalculatorGroupItemTotal';

const CalculatorGroup = ({currentUnit,name,items,updateSizeChange, updateQtyChange, groupId}) => {

    const updateSizeChangeHandler = (value,groupId,itemId) => {
        updateSizeChange(value,groupId,itemId);
    }
    const updateQtyChangeHandler = (value,groupId,itemId) => {
        updateQtyChange(value,groupId,itemId);
    }
    return(
        <div className="w-full mb-6">
            <CalculatorGroupHeader currentUnit={currentUnit} name={name} items={items}/>
            <div className="grid grid-cols-12 gap-5 pt-4 pb-0">
                <div className="col-span-12">
                    <CalculatorGroupItems updateSizeChangeHandler={updateSizeChangeHandler} updateQtyChangeHandler={updateQtyChangeHandler} currentUnit={currentUnit} items={items} groupId={groupId}/>
                </div>
                {/* <div className="col-span-3">
                    <CalculatorGroupItemTotal currentUnit={currentUnit} items={items}/>
                </div> */}
            </div>
        </div>
    )
}

export default CalculatorGroup;
import React from 'react';
import CalculatorGroupItem from '../CalculatorGroupItem/CalculatorGroupItem';

const CalculatorGroupItems = ({currentUnit, items,updateSizeChangeHandler, updateQtyChangeHandler, key, groupId}) => {
    const onSizeChange = (value,groupId,itemId) => {
        updateSizeChangeHandler(value,groupId,itemId);
    }
    const onQtyChange = (value,groupId,itemId) => {
        updateQtyChangeHandler(value,groupId,itemId);
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-8 lg:gap-y-12 px-4">
            {items.map((item)=>{
                return(
                    <CalculatorGroupItem key={item.id} groupId={groupId} onSizeChange={onSizeChange} onQtyChange={onQtyChange} currentUnit={currentUnit} item={item}/>
                )
            })}
            
        </div>
    )
}

export default CalculatorGroupItems;
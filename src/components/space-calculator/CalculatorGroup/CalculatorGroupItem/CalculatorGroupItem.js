import React,{useState,useEffect} from 'react';

const CalculatorGroupItem = ({currentUnit, item, onSizeChange, onQtyChange, groupId}) => {
    const height = Math.round(((item.height * currentUnit.multiplier) + Number.EPSILON) * 100) / 100;
    const width = Math.round(((item.width * currentUnit.multiplier) + Number.EPSILON) * 100) / 100;
    const minSize = currentUnit.name === 'metric' ? parseInt(item.minSize) : parseInt(item.minSizeMt);
    const size = currentUnit.name === 'metric' ? item.sizeFt : item.sizeMt
    const itemTotal = Math.round(((size * item.qty * currentUnit.multiplier)+ Number.EPSILON) * 100) / 100;
    let itemTotalHtml = '';

    const [inputQty, setInputQty] = useState(item.qty);
    const [inputSize, setInputSize] = useState(
        currentUnit.name === 'metric' ? item.sizeFt : item.sizeMt
    );
    const [minSizeCheck,setMinSizeCheck] = useState(true);
    const [maxSizeCheck,setMaxSizeCheck] = useState(true);

    
    const inputQtyHandler = (e) => {
        setInputQty(e.target.value);
        onQtyChange(e.target.value,groupId,item.id);
    }
    const inputSizeHandler = (e) => {
        setInputSize(e.target.value);
        onSizeChange(e.target.value,groupId,item.id);
        e.target.value < minSize ? setMinSizeCheck(false) : setMinSizeCheck(true);
        e.target.value > 10000 ? setMaxSizeCheck(false) : setMaxSizeCheck(true);
    }

    useEffect(()=>{setInputSize(size)},[currentUnit]);
    
    if(itemTotal > 0){
        itemTotalHtml = <div className="font-semibold text-sm pt-2 flex justify-start items-center">
                            <div className="text-left">
                                <span className="font-semibold text-sm ">Total :</span>
                            </div> 
                            <span className="text-base font-semibold text-secondary text-right w-2/12 lg:w-4/12 ml-2">{itemTotal} </span> <span className="text-xs block ml-1"> ({currentUnit.unit})</span>
                        </div>;
    }
    return(
        <div className="text-left space-y-1 px-0 md:pr-8">
            <div className="flex gap-4 items-center justify-start">
                <img className="mr-auto w-12 h-12 object-contain object-left -ml-1" src={item.imgUrl} alt=""/>
                <div className=" flex-1">
                    <h4 className="capitalize text-xs text-primary font-semibold lg:font-medium">{item.name}</h4>
                    <span className="block mt-1 text-xs">{item.desc ? item.desc : ''}</span>
                </div>
            </div>
            {/* <div className="space-x-1 font-semibold"><span>{height}</span><span>x</span><span>{width}</span></div> */}
            
            <div className="flex flex-row justify-start items-center space-y-1 pt-2">
                <div className="w-20 text-left">
                    <span className="font-semibold text-xs ">Size :</span>
                    <span className="text-xs block">({currentUnit.unit})</span>
                    {!minSizeCheck ? <span className="text-xs block text-red-500 font-semibold">Min Req. : {minSize}</span> : ''}
                    {!maxSizeCheck ? <span className="text-xs block text-red-500 font-semibold">Max : 10000</span> : ''}
                </div>
                <input value={inputSize} onChange={inputSizeHandler} groupid={groupId} id={item.id} type="number" min="0" className="text-xs w-20 h-6 ml-2 outline-none border-b-2 border-gray-200 text-center text-gray-700" /> 
            </div>
            <div className="flex flex-row justify-start items-center space-y-1 pt-2">
                <div className="w-20 text-left">
                    <span className="font-semibold text-xs ">Unit :</span>
                    
                </div>
                <input  value={inputQty} onChange={inputQtyHandler} groupid={groupId} id={item.id} type="number" min="0" className="text-xs w-20 h-6 ml-2 outline-none border-b-2 border-gray-200 text-center text-gray-700 " />
            </div>
            {itemTotalHtml}
        </div>
    )
}

export default CalculatorGroupItem;
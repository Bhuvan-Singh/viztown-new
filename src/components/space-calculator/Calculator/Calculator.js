import React, {useState, useEffect} from 'react';
import Loader from "react-loader-spinner";

import Download from '../Download/Download';
import UnitToggle from '../UnitToggle/UnitToggle';
import CalculatorTotal from '../CalculatorTotal/CalculatorTotal';
import CalculatorGroup from '../CalculatorGroup/CalculatorGroup';
import IndexLayout from '../../showcase/index/IndexLayout';
import axiosConfig from '../../../axiosConfig'

const INITIAL_UNITYPES = [
    {
    id:0,
    name:'metric',
    unit : 'sq. ft',
    multiplier : 1,
    cost: {
        modern: 5000,
        semiConventional: 1800,
        conventional: 2000
    }
    },{
    id:1,
    name:'imperial',
    unit : 'sq. meters',
    multiplier : 1,
    cost: {
        modern: 1500,
        semiConventional: 1800,
        conventional: 2000
    }
}];

const Calculator = () => {
    // let unitTypes = [];
    const [unitType, setUnitType] = useState(INITIAL_UNITYPES);
    const [currentUnit, setCurrentUnit] = useState(unitType[0]);
    const [calculatorGroups, setCalculatorGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [calculatorTotal, setCalculatorTotal] = useState({
        subTotal: 0,
        circulation: 0,
        usableSpace:0,
        totalCost: {
            modernCost : 0, 
            semiConventionalCost : 0, 
            conventionalCost : 0
        }
        
    });
    
    const [circulationFactor, SetCirculationFactor] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('₹');
    const [minCheck, setMinCheck] = useState(0);
    
    const loadGroups = async () => {
        await fetch(`${process.env.API_URL}/GetCalculatorDetails`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY
            }})
            .then(res => res.json())
            .then(res => {console.log(res);setCalculatorGroups(res.data); loadUnitTypes();});

        // await axiosConfig.get("/GetCalculatorDetails")
        //     .the(result => {setCalculatorGroups(res); loadUnitTypes()})
    }



    const loadUnitTypes = async () => {
        await fetch(`${process.env.API_URL}/GetCostAndCirculation`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY
            }})
            .then(res => res.json())
            .then(res => {
                console.log(res);
                SetCirculationFactor(res.data.circulation); 
                setUnitType(res.data.unitType);
                
                setLoaded(true);
            });
    }
    useEffect(()=>{
        setCurrentUnit(unitType[0]);
    },[unitType])

    useEffect(()=>{
        loadGroups();
    },[])

    const roundTwoPlaces = (a) => {
        return Math.round(((a)+ Number.EPSILON) * 100) / 100;
    }

    const UnitToggleHandler = (e) => {
        
        unitType.map((type) => {
            if( type.name == e.target.value){
                setCurrentUnit(type);
            }
        })
        
    }
    useEffect(()=>{calculateTotal()},[currentUnit,calculatorGroups])
    useEffect(()=>{calculatorTotal.subTotal === 0 ? setMinCheck(0) : setMinCheck(1);},[calculatorTotal])

    useEffect(()=>{
        const calculatorGroupsInstance = [...calculatorGroups];
        calculatorGroupsInstance.map((group) => {
            group.items.map((item) => {
                if(currentUnit.name === 'metric'){
                    item.size = item.size * 3.28;
                }else{
                    item.size = item.size * 0.3048;
                }
                
            })
        })
        
        setCalculatorGroups(calculatorGroupsInstance);        
    },[currentUnit])
    
    const updateQtyChange = (value,groupId,itemId)=>{
        const calculatorGroupsInstance = [...calculatorGroups];
        calculatorGroupsInstance.map((group) => {
            if(group.id === groupId){
                group.items.map((item) => {
                    if(item.id == itemId){
                        item.qty = value;
                    } 
                })
            }
        })
        setCalculatorGroups(calculatorGroupsInstance);
    }

    const updateSizeChange = (value,groupId,itemId)=>{
        const calculatorGroupsInstance = [...calculatorGroups];
        calculatorGroupsInstance.map((group) => {
            if(group.id === groupId){
                group.items.map((item) => {
                    if(item.id == itemId){
                        if(currentUnit.name === 'metric') {
                            item.sizeFt = value;
                            item.sizeMt = Math.round(value * 0.3048);
                        }else{
                            item.sizeMt = value;
                            item.sizeFt = Math.round(value * 3.288);
                        }
                    } 
                })
            }
        })
        setCalculatorGroups(calculatorGroupsInstance);
    }

    const calculateTotal = () => {
        let subTotal = 0, circulation = 0, usableSpace = 0, modernCost = 0, semiConventionalCost = 0, conventionalCost = 0;
        calculatorGroups.map((group)=>{
            group.items.map((item)=>{
                const size = currentUnit.name === 'metric' ? item.sizeFt : item.sizeMt;
                subTotal += size * parseInt(item.qty);
            })
        })
        subTotal = subTotal * currentUnit.multiplier;
        circulation = subTotal * circulationFactor;
        usableSpace = subTotal + circulation;
        modernCost = usableSpace * currentUnit.cost.modern;
        semiConventionalCost = usableSpace * currentUnit.cost.semiConventional;
        conventionalCost = usableSpace * currentUnit.cost.conventional;
        setCalculatorTotal({
            subTotal: roundTwoPlaces(subTotal),
            circulation: roundTwoPlaces(circulation),
            usableSpace: roundTwoPlaces(usableSpace),
            totalCost: {
                modernCost : roundTwoPlaces(modernCost), 
                semiConventionalCost : roundTwoPlaces(semiConventionalCost), 
                conventionalCost : roundTwoPlaces(conventionalCost)
            }
        })
    }
    let loadedDiv = <div className="w-full flex justify-center items-center h-64">
                        <Loader
                            type="Rings"
                            color="#ddd"
                            height={80}
                            width={80}
                        /> 
                    </div>;
    if(loaded){
        loadedDiv = <IndexLayout>
                        <div className="text-blueBase w-full flex justify-between p-4 flex-shrink-0 bg-white">
                            <UnitToggle onChange={(e) => UnitToggleHandler(e)} currentUnit={currentUnit}/> 
                            <div className="hidden md:block flex-shrink-0">
                                <Download calculatorTotal={calculatorTotal} minCheck={minCheck} currentUnit={currentUnit} calculatorGroups={calculatorGroups}/>
                            </div>
                        </div>
                            
                        <div className="calculator--body bg-white">
                            {
                                calculatorGroups.map((group)=>{
                                    return (
                                        <CalculatorGroup calculatorGroups={calculatorGroups} updateQtyChange={updateQtyChange} updateSizeChange={updateSizeChange} currentUnit={currentUnit} key={group.id} name={group.name} items={group.items} groupId={group.id}/>
                                    )
                                })
                            }
                            <CalculatorTotal currencySymbol={currencySymbol} calculatorTotal={calculatorTotal} currentUnit={currentUnit} calculatorGroups={calculatorGroups} minCheck={minCheck} circulationFactor={circulationFactor}/>
                        </div>
                    </IndexLayout>;
    }

    return(
        <div className="calculator--wrapper bg-white">
            {loadedDiv}
            
        </div>
    )
}

export default Calculator;
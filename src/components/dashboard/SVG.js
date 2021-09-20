import React, {useEffect, useState} from 'react'
import * as d3 from "d3";

export default function SVG() {
    const [roomName, setRoomName] = useState("");

    const handleChange = (e) => {
        setRoomName(e.target.value);
    }
    useEffect(()=>{
        d3.xml("http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/floorplan.svg")
            .then(result => {
                d3.select("#svg-container").node()
                    .append(result.documentElement)

                let svg = d3.select("#svg-container > svg")
                svg.attr("preserveAspectRatio", "xMidYMid meet").attr('width', null).attr('height', null).attr('style', "position:absolute; width:100%; height:100%");
                svg.append('g').attr('class','svg-marker').attr('data-active', false).attr('id',"svg-marker")
                        .append('g').attr('transform', 'rotate(-150.2790588865837 0 0)')
                            .append('path').attr('d','M0.707 0 L0.3535 0.3535 a0.5,0.5 0 1 1 0 -0.707 z').attr('style','fill:red').attr('transform',"scale(20.7865384615384)")
                        .append('circle').attr('r','0.15').attr('fill','white')

                let data = [], width = 600, height = 400, numPoints = 100;
                var zoom = d3.zoom().on('zoom', handleZoom);

                function handleZoom(e) {
                    console.log(e.transform)
                    d3.select('#svg-container > svg')
                        // .attr('transform', e.transform);
                        .attr('viewBox', `0 0 ${Math.abs(e.transform.x *  e.transform.k) } ${Math.abs(e.transform.y *  e.transform.k)}` )
                    // d3.select('.svg-marker')
                    //     .attr('transform', e.transform);
                
                    d3.select('#svg-marker path')
                        .attr('transform', `scale(${Math.abs(4*(e.transform.k))})` )
                }

                function initZoom() {
                    d3.select('#svg-container > svg')
                        .call(zoom);
                }

                function updateData() {
                    data = [];
                    for(let i=0; i<numPoints; i++) {
                        data.push({
                            id: i,
                            x: Math.random() * width,
                            y: Math.random() * height
                        });
                    }
                }
                
                let xPos , yPos;
                var svgDoc = document.querySelector('#svg-container > svg');
                /* var rect = svg.getElementById("box"); */
                var pt = svgDoc.createSVGPoint();
                svgDoc.addEventListener("mousedown", alert_click, false);
                function moveSection(idStr, xOffset, yOffset) {
                    var domElemnt = document.getElementById(idStr);
                    if (domElemnt) {
                      var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
                      domElemnt.setAttribute('transform', transformAttr);
                    }
                }

                function alert_click(evt) {
                    console.log(roomName )
                    var cursorpt = cursorPoint(evt);
                    console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");
                    xPos = cursorpt.x;
                    yPos = cursorpt.y;
                    moveSection("svg-marker", xPos, yPos);
                    svg.append('text').text(roomName).attr('x',xPos).attr('y',yPos).attr('fill','#333')
                }
                    
                function cursorPoint(evt, element=null) {
                    pt.x = evt.clientX; 
                    pt.y = evt.clientY;
                    
                    if (element === null)
                        return pt.matrixTransform(svgDoc.getScreenCTM().inverse());
                    else
                        return pt.matrixTransform(element.getScreenCTM().inverse());
                }

                // function update() {
                //     d3.select('#svg-container > svg')
                //         .attr('cx', function(d) { return d.x; })
                //         .attr('cy', function(d) { return d.y; })
                //         .attr('r', 3);
                // }

                initZoom();
                updateData();
                // update();
            });
        
    },[])
    // let xPos , yPos;

    // function alert_click(evt) {
    //     var cursorpt = cursorPoint(evt);
    //     console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");
    //     xPos = cursorpt.x;
    //     yPos = cursorpt.y;
    //     moveSection("svg-marker", xPos, yPos);
    //     svg.append('text').text(roomName).attr('x',xPos).attr('y',yPos).attr('fill','#333')
    // }

    // let svg = d3.select("#svg-container > svg")
    // var svgDoc = document.querySelector('#svg-container > svg');
    // var pt = svgDoc.createSVGPoint();

    // function cursorPoint(evt, element=null) {
    //     pt.x = evt.clientX; 
    //     pt.y = evt.clientY;
        
    //     if (element === null)
    //         return pt.matrixTransform(svgDoc.getScreenCTM().inverse());
    //     else
    //         return pt.matrixTransform(element.getScreenCTM().inverse());
    // }

    // function moveSection(idStr, xOffset, yOffset) {
    //     var domElemnt = document.getElementById(idStr);
    //     if (domElemnt) {
    //         var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
    //         domElemnt.setAttribute('transform', transformAttr);
    //     }
    // }
    // svgDoc.addEventListener("mousedown", alert_click, false);
    const handleClick = (name) => {
        
       
        console.log(roomName )
        

        
            
        
    }
    return (
        <>
            <div id="svg-container" className="w-3/5 h-96 flex relative items-stretch flex-grow"></div>
            <div>
                <button onClick={(roomName) => handleClick(roomName)}>Add Room</button>
                <input type="text" name="title" className="h-11 border-2 border-grey" onChange={e => handleChange(e)} value={roomName}/> 
                <span>X Coordinate : </span><span>Y Coordinate : </span>
            </div>
        </>
    )
}

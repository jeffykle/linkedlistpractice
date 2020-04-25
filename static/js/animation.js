// TODO fix new line math,drawing placement, marker element placement, 

const svg = d3.select('#svg');

export function drawNode(val) {
    let cx = 25+80*val+50
    let cy = 93.75 * ( Math.ceil(cx / (window.innerWidth - 75)) )
    let h = parseInt(document.querySelector('#svg').style.height, 10)
    // console.log({"window":window.innerWidth, "x": cx, "y": cy, "h": h})
    // if (cx > window.innerWidth) {
        // cy = cy 
    const isNewLine = cy + 25 > h
    if (cy + 25 > h) {
        document.querySelector('#svg').style.height = h + 93.75 + "px"
    }
    cx = cx % window.innerWidth
        // console.log({"window":window.innerWidth, "x": cx, "y": cy, "box height": document.querySelector('#svg').style.height})
    // }
    const nodeShapes = svg.append('g')
        .attr('class', 'node-group')
        .attr('id', 'Node-'+val)
        .attr('x', cx)
        .attr('y', cy)
        .on('click', function() {
                        console.log(`Clicked Node-${val}!`)
                        selectNode(val)
                        }
            )
    nodeShapes.append('circle')
        .attr('id','circle-'+val)
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 25)
        .style('fill', '#0D3FA5')

    nodeShapes.append("line")
        .attr("id", "line-"+val)
        .attr("x1", cx+25)
        .attr("y1", cy)
        .attr("x2", cx+50)
        .attr("y2", cy)          
        .attr("stroke-width", 1)
        .attr("stroke", "#5A5A5A")
        .attr("marker-end", "url(#triangle)")
    // nodeShapes.append("svg:defs").append("svg:marker")
    nodeShapes.append("marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "#5A5A5A")
    nodeShapes.append('text')
        .attr("id", "node-label-"+val)
        .attr("x", cx)//-5*val.toString().length)
        .attr("y", cy+6.25)
        .attr("font-size", 20)
        .style("fill","white")
        .style("text-anchor", "middle")
        .text(val.toString())
    if(val === 0) {
        nodeShapes.append('text')
        .attr("id", "node-head-label")
        .attr("x", cx)//-5*val.toString().length)
        .attr("y", cy+55)
        .attr("font-size", 20)
        .attr("font-weight", 900)
        .style("fill","#22801D")
        .style("text-anchor", "middle")
        .text("H")
    }
    if( isNewLine ) {
        const prevLine = "#line-"+(val-1)
        const prevX1 = d3.select(prevLine).attr("x1")
        const prevY1 = d3.select(prevLine).attr("y1")
        console.log(prevX1,prevY1)
        d3.select(prevLine)
            .attr("x1", prevX1-25)
            .attr("y1", cy-63.75)
            .attr("x2", cx+30)
            .attr("y2", cy-30)
        }


};

export function redrawList() {
    array.forEach((val, i) => {
            drawNode(val)
            i == array.length - 1 && selectNode(val)
        })
}
export function selectNode(val) {
    d3.selectAll('.selected-node')
        .classed('selected-node',false)
    d3.selectAll('circle')
        .style('fill', '#0D3FA5')
    d3.select('#Node-'+val)
        .selectAll('circle')
        .style('fill', '#F17D00')
        .classed('selected-node',true)
    pulseNode(val)

}

export function pulseNode(val) {
    d3.select("#circle-"+val).raise()
    console.log(d3.select("#node-label-"+val))
    d3.select("#node-label-"+val).raise()
    d3.select("#circle-"+val)
      .transition().duration(200).attr("r", "35")
      .transition().duration(190).attr("r", "25")
      .transition().duration(180).attr("r", "30")
      .transition().duration(300).attr("r", "25")
}

export function eraseNode(val) {    
    document.querySelector('#Node-'+val).remove()
}

export function eraseAll() {
    svg.selectAll("*").remove()
    document.querySelector('#svg').style.height = "200px"
}

export function toggleDarkmode() {
    const bgcolor = window.getComputedStyle(document.querySelector('body')).backgroundColor
    console.log('bgcolor: '+ bgcolor)
    if(bgcolor != 'rgb(255, 255, 255)'){
        document.querySelector('body').style.backgroundColor = 'white'
        document.querySelector('body').style.color = 'black'
        document.querySelectorAll('.btn-outline-light').forEach(btn => btn.classList.replace('btn-outline-light', 'btn-outline-dark'))
        document.querySelectorAll('.btn-light').forEach(btn => btn.classList.replace('btn-light', 'btn-dark'))
    }
    else {
        document.querySelector('body').style.backgroundColor = '#1E1E1E'
        document.querySelector('body').style.color = 'white'
        document.querySelectorAll('.btn-outline-dark').forEach(btn => btn.classList.replace('btn-outline-dark', 'btn-outline-light'))
        document.querySelectorAll('.btn-dark').forEach(btn => btn.classList.replace('btn-dark', 'btn-light'))
    } 
}

export function openContructControls() {
    document.querySelector('#construct-list').classList.replace('btn-outline-dark', 'btn-dark')
    document.querySelector('#modify-list').classList.replace('btn-dark', 'btn-outline-dark')
    document.querySelector('#construct-list').classList.replace('btn-outline-light', 'btn-light')
    document.querySelector('#modify-list').classList.replace('btn-light', 'btn-outline-light')
    hideThenShow(['modify-controls'], ['construct-controls'])
}

export function openModifyControls() {
    document.querySelector('#modify-list').classList.replace('btn-outline-dark', 'btn-dark')
    document.querySelector('#construct-list').classList.replace('btn-dark', 'btn-outline-dark')
    document.querySelector('#modify-list').classList.replace('btn-outline-light', 'btn-light')
    document.querySelector('#construct-list').classList.replace('btn-light', 'btn-outline-light')
    hideThenShow(['construct-controls'], ['modify-controls'])
}

function hideThenShow(elem1idArray, elem2idArray) {
    elem1idArray.forEach(elem1id => {
        const elem = document.querySelector(`#${elem1id}`)
        elem.style.display == 'block' && (elem.style.display = 'none')
    });
    elem2idArray.forEach(elem2id => {
        const elem = document.querySelector(`#${elem2id}`)
        elem.style.display == 'none' && (elem.style.display = 'block')
    });
}

export function resetMatrixButtons() {
    document.querySelectorAll('.matrix').forEach(btn => btn.classList.replace('btn-dark', 'btn-outline-dark'))
    document.querySelectorAll('.matrix').forEach(btn => btn.classList.replace('btn-light', 'btn-outline-light'))
    document.querySelectorAll('.matrix-attr').forEach(btn => btn.innerHTML = '')
    event.srcElement.classList.replace('btn-outline-dark','btn-dark')
    event.srcElement.classList.replace('btn-outline-light','btn-light')
}

export function resetCall() {
        document.querySelector("#statement-var").innerHTML = "________"
        document.querySelector("#statement-var").attributes.value.value = "none"
        document.querySelector("#statement-expr").innerHTML = "________"
        document.querySelector("#statement-expr").attributes.value.value = "none"
        document.querySelector("#confirm").style.display = "none"
}

export function addToExpression(event) {
    if(document.querySelector("#statement-var").attributes.value.value == 'none'){
        document.querySelector("#statement-var").innerHTML = event.srcElement.innerHTML
        document.querySelector("#statement-var").attributes.value.value = event.srcElement.attributes.value.value
    }
    else if(document.querySelector("#statement-expr").attributes.value.value == 'none'){
        document.querySelector("#statement-expr").innerHTML = event.srcElement.innerHTML
        document.querySelector("#statement-expr").attributes.value.value = event.srcElement.attributes.value.value
        document.querySelector("#confirm").style.display = "block"
    }
}

export function addToHistory(statementVar, statementExpr) {
    document.querySelector("#call-history").innerHTML += `<br>${statementVar} = ${statementExpr}`
}

export function changeHead(val) {
    const headHeight = d3.select("#node-head-label").attr("y")
    d3.select("#node-head-label").remove()
    const newHead = d3.select(`#Node-${val}`)
    newHead.append('text')
        .attr("id", "node-head-label")
        .attr("x", newHead.attr("x"))
        .attr("y", headHeight)
        .attr("font-size", 20)
        .attr("font-weight", 900)
        .style("fill","#22801D")
        .style("text-anchor", "middle")
        .text("H")
}
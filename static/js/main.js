// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {

    var current, previous = null

    const svg = d3.select('#svg');

    document.querySelector('#toggle-darkmode').onclick = ()  => {
        const bgcolor = window.getComputedStyle(document.querySelector('body')).backgroundColor
        console.log('bgcolor: '+ bgcolor)
        if(bgcolor != 'rgb(255, 255, 255)'){
            document.querySelector('body').style.backgroundColor = 'white'
            document.querySelector('body').style.color = 'black'
            document.querySelectorAll('.btn-outline-light').forEach(btn => btn.classList.replace('btn-outline-light', 'btn-outline-dark'))
        }
        else {
            document.querySelector('body').style.backgroundColor = '#1E1E1E'
            document.querySelector('body').style.color = 'white'
            document.querySelectorAll('.btn-outline-dark').forEach(btn => btn.classList.replace('btn-outline-dark', 'btn-outline-light'))
        } 
    };


    document.querySelector('#insert-node').onclick = ()  => {
        renderContent('insert-node')
    };

    document.querySelector('#pop-node').onclick = ()  => {
        popNode()
    };

    document.querySelector('#get-head').onclick = ()  => {
        getHead()
    };

    document.querySelector('#get-next').onclick = ()  => {
        // renderContent('insert-node')
    };

    document.querySelector('#reset-list').onclick = ()  => {
        svg.selectAll("*").remove()
        document.querySelector('#svg').style.height = "200px"
        renderContent('reset-list')
    };

    function draw_node(val) {
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

    function selectNode(val) {
        d3.selectAll('.selected-node')
            .classed('selected-node',false)
        d3.selectAll('circle')
                .style('fill', '#0D3FA5')
        d3.select('#Node-'+val)
            .selectAll('circle')
                .style('fill', '#F17D00')
            .classed('selected-node',true)
        pulseNode(val)
        current = {
            "value": val,
            "next": val+1
        }
        previous = {
            "value": val == 0 ? null : val - 1,
            "next": val+1
        }
        console.log(`Current: ${JSON.stringify(current)}, Previous: ${JSON.stringify(previous)}`)

    }

    //  TODO
    function redrawNode(val) {

    }

    function pulseNode(val) {
        d3.select("#circle-"+val).raise()
        d3.select("#node-label-"+val).raise()
        d3.select("#circle-"+val)
          .transition().duration(200).attr("r", "35")
          .transition().duration(190).attr("r", "25")
          .transition().duration(180).attr("r", "30")
          .transition().duration(300).attr("r", "25")
    }

    function sendRequest(name, callback) {
        const request = new XMLHttpRequest();
        request.open('GET', `/${name}`);
        request.onload = () => {
            callback(request)
                    };
        request.send();
    }

    function renderContent(name) {
        sendRequest(name, request => {
            const res = JSON.parse(request.responseText);

            document.querySelector('#head').innerHTML = JSON.stringify(res.head.value)
            document.querySelector('#tail').innerHTML = JSON.stringify(res.tail.value)
            document.querySelector('#current').innerHTML = JSON.stringify(res.current.value)
            document.querySelector('#previous').innerHTML = JSON.stringify(res.previous.value)
            document.querySelector('#list-nodes').innerHTML = res.string

            if(res.current != null){
                draw_node(res.current.value)
                selectNode(res.current.value)
            }
        })  
    }

    function popNode() {
        sendRequest(name, request => {
            const res = JSON.parse(request.responseText);
            tail = res.tail
            console.log('Got the tail from python: '+JSON.stringify(tail))

            //modify innerhtml here

            console.log(tail.value)
            if(tail.value != null){
                document.querySelector('#Node-'+tail.value).remove()
                selectNode(res.previous.value)
                console.log(`Popped ${JSON.stringify(tail)}`)
            }
            else {
                console.log('DID NOT POP!')
            }
        })
    }


    function getHead() {
        sendRequest(name, request => {
            const res = JSON.parse(request.responseText);
            const head = res.head
            console.log('Got the head from python: '+JSON.stringify(head))

            //modify innerhtml
            document.querySelector('#current').innerHTML = JSON.stringify(head)

            //modify svg
            console.log(head.value)
            if(head.value != null){
                selectNode(head.value)
                console.log(`Selected Head:  ${JSON.stringify(head)}`)
            }
            else {
                console.log('DID NOT SELECT HEAD!')
            }
        })
    };



        request.send();
        return
    }

    function getNext(curVal) {
        sendRequest(name, request => {
            const res = JSON.parse(request.responseText);

        })
    }


     /* For the drop shadow filter... */
  var defs = svg.append("defs");

  var filter = defs.append("filter")
      .attr("id", "dropshadow")

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4)
      .attr("result", "blur");
  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");


});
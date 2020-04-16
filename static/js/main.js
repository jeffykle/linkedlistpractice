// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {

    var current, previous = null

    const svg = d3.select('#svg');

    document.querySelector('#insert-node').onclick = ()  => {
        load_page('insert-node')
    };

    document.querySelector('#reset-list').onclick = ()  => {
        svg.selectAll("*").remove()
        document.querySelector('#svg').style.height = "200px"
        load_page('reset-list')
    };

    function draw_node(val) {
        let cx = 25+80*val
        let cy = 93.75 * ( Math.ceil(cx / window.innerWidth) )
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
            .style('fill', 'lightblue')

        nodeShapes.append("line")
            .attr("id", "line-"+val)
            .attr("x1", cx+25)
            .attr("y1", cy)
            .attr("x2", cx+50)
            .attr("y2", cy)          
            .attr("stroke-width", 1)
            .attr("stroke", "black")
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
            .style("fill", "black")
        nodeShapes.append('text')
            .attr("x", cx-5*val.toString().length)
            .attr("y", cy+5)
            .attr("font-size", 20)
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
                .style('fill', 'lightblue')
        d3.select('#Node-'+val)
            .selectAll('circle')
                .style('fill', '#E8AC56')
            .classed('selected-node',true)
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


    function load_page(name) {
        const request = new XMLHttpRequest();
        request.open('GET', `/${name}`);

        request.onload = () => {
            const response = request.responseText;
            const json = JSON.parse(response)
            current = json.current
            previous = json.previous

            document.querySelector('#list-attr').innerHTML = json.attr.attr
            document.querySelector('#list-nodes').innerHTML = 'List contents: ' + json.attr.nodes

            if(json.current != null){
                draw_node(json.current.value)}
                console.log(`Current: ${JSON.stringify(current)}, Previous: ${JSON.stringify(previous)}`)
        };


        request.send();
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
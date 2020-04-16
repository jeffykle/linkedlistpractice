// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {

        const svg = d3.select('#svg');

        document.querySelector('#insert-node').onclick = ()  => {
            load_page('insert-node')

        };

        document.querySelector('#reset-list').onclick = ()  => {
            svg.selectAll("*").remove()
            document.querySelector('#svg').style.height = "200px"
            load_page('reset-list')
        };

        svg.on('click', function() {
            console.log('clicked!')
        });

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

        svg.append('circle')
            .attr('id','circle-'+val)
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', 25)
            .style('fill', 'lightblue')

        svg.append("line")
            .attr("id", "line-"+val)
            .attr("x1", cx+25)
            .attr("y1", cy)
            .attr("x2", cx+50)
            .attr("y2", cy)          
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("marker-end", "url(#triangle)")
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", "black")
        svg.append('text')
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

    //  TODO
    function redrawNode(val) {

    }


    function load_page(name) {
        const request = new XMLHttpRequest();
        request.open('GET', `/${name}`);

        request.onload = () => {
            const response = request.responseText;
            const json = JSON.parse(response)

            document.querySelector('#list-attr').innerHTML = json.attr.attr
            document.querySelector('#list-nodes').innerHTML = 'List contents: ' + json.attr.nodes

            if(json.current != null){
                draw_node(json.current.value)}
                console.log(`Current: ${JSON.stringify(json.current)}, Previous: ${JSON.stringify(json.previous)}`) //TODO fix recursive printing, or class recursion storing all previous node versions (check js console.log)
            };


            request.send();
        }


    });
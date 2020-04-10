// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {

    function draw_node(val) {
        const nodeId = 'node-'+val
        let cx = 25+80*val
        let cy = 93.75
        let h = parseInt(document.querySelector('#svg').style.height, 10)
        console.log({"window":window.innerWidth, "x": cx, "y": cy, "h": h})
        if (cx > window.innerWidth) {
            cy = cy * ( Math.ceil(cx / window.innerWidth) )
            if (cy + 25 > h) {
                document.querySelector('#svg').style.height = h + 93.75 + "px"
            }
            cx = cx % window.innerWidth
            console.log({"window":window.innerWidth, "x": cx, "y": cy, "box height": document.querySelector('#svg').style.height})
        }

        svg.append('circle')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', 25)
            .attr('id',nodeId)
            .style('fill', 'lightblue')

        svg.append("line")
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
            .style("fill", "black");
        d3.selectAll("circle").lower()
    };


    function load_page(name) {
        const request = new XMLHttpRequest();
        request.open('GET', `/${name}`);
        request.onload = () => {
            const response = request.responseText;
            const json = JSON.parse(response)
            const attr = json.print.attr
            const list = json.print.nodes

            console.log(json.val==0)
            document.querySelector('#list-attr').innerHTML = attr
            document.querySelector('#list-nodes').innerHTML = list

            if(json.val != null){
                draw_node(json.val)}
            };
            request.send();
        }


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



    });
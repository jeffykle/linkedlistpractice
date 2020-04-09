// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {

  function draw_node(val) {
    const nodeId = 'node-'+val

      svg.append('circle')
      .attr('cx', val*75+25)
      .attr('cy', 100-25/4)
      .attr('r', 25)
      .attr('id',nodeId)
      .style('fill', 'lightblue')
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
    load_page('reset-list')
    };

  svg.on('click', function() {
    console.log('clicked!')
  });



});
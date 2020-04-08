// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {
  
function load_page(name) {
  const request = new XMLHttpRequest();
  request.open('GET', `/${name}`);
  request.onload = () => {
    const response = request.responseText;
    const json = JSON.parse(response)
    console.log(json)
    document.querySelector('#print-list').innerHTML = json.print.nodes;
    draw_node(json.val)
  };
  request.send();
}
  const svg = d3.select('#svg');

      function draw_node(val) {

      svg.append('circle')
      .attr('cx', val*75+25)
      .attr('cy', 100)
      .attr('r', 25)
      .attr('id','node-'+val.toString())
      .style('fill', 'black');
  // console.log(coords)
};
  
  document.querySelector('#insert-node').onclick = ()  => {
load_page('insert-node')

    };
  document.querySelector('#reset-list').onclick = ()  => {
     svg.selectAll("*").remove()
load_page('reset-list')

    };



// svg.on('mousemove', draw_point);
svg.on('click', function() {
  console.log('clicked!')
});



});
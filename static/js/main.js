// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {
  
function load_page(name) {
  const request = new XMLHttpRequest();
  request.open('GET', `/${name}`);
  request.onload = () => {
    const response = request.responseText;
    console.log(response)
    document.querySelector('#print-list').innerHTML = response.json().print;
    draw_node(response.val)
  };
  request.send();
}
  const svg = d3.select('#svg');

      function draw_node(val) {

      svg.append('circle')
      .attr('cx', 10+25)
      .attr('cy', 50)
      .attr('r', 25)
      .style('fill', 'black');
  // console.log(coords)
};
  
  document.querySelector('#insert-node').onclick = ()  => {
load_page('insert-node')

    };



// svg.on('mousemove', draw_point);
svg.on('click', function() {
  console.log('clicked!')
});



});
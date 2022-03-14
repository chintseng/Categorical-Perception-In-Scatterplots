// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
const w = 400;
const h = 400;

const palette = {
  'D3': ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],
  'Tableau': ["#17becf","#bcbd22","#7f7f7f", "#e377c2", "#8c564b", "#9467bd", "#d62728", "#2ca02c","#ff7f0e", "#1f77b4"],
  'Matlab': ['#0072BD', '#D95319', 	'#EDB120', '#7E2F8E',	'#77AC30', '#4DBEEE', '#A2142F'],
  'ColorBrewer': ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
}

let maxCatIndex;
let taskNum = 0
let taskCnt = 0

const svg = d3.select("#task-div")
  .append("svg")
  .attr("width",  width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


function genChart() {
    const urlParams = new URLSearchParams(window.location.search);
    const useShape = urlParams.get('shape');
    taskNum = urlParams.get('task');
    taskCnt = urlParams.get('cnt');
    let colorPalette = 'D3'

  //Read the data
    d3.csv("./task/"+taskNum+"/"+taskCnt+".csv").then(function(data) {
        const categoryNum = parseInt(data[data.length-1]['ca'])+1
        for (let i = 0; i < categoryNum; i++) {
          let maple = svg.append('defs')
          .append('pattern')
          .attr('id', 'shape_'+i)
          .attr('patternUnits', 'objectBoundingBox')
          .attr('width', 10)
          .attr('height', 10)
          // Append svg to pattern
          .append('svg')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 10)
          .attr('height', 10)

          let filename = "s" + (i+1)
          d3.xml("./asset/"+filename+".svg")
          .then(data => {
            const node = document.createElement("style");
            const textnode = document.createTextNode(`.cls-${i+1}{fill:${palette[colorPalette][i]};}`);
            node.appendChild(textnode);
            data.getElementById(filename).appendChild(node)
            maple.node().append(data.documentElement)
          });
        }


    const x = d3.scaleLinear()
      .domain([-1.0, 11])
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((domainn,number)=>{return ""}));

    const y = d3.scaleLinear()
      .domain([-1, 11])
      .range([ height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat((domainn,number)=>{return ""}));

    const color = d3.scaleOrdinal()
      .domain(["0", "1", "2", "3", "4", "5"])
      .range(palette[colorPalette])

    if (useShape == 'true') {
      svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter().append("path")
      .attr("d", d3.symbol().size(575).type(d3.symbolSquare))
      .attr("transform", d => {
        return "translate(" + x(d.x) + "," + y(d.y) + ")";
      })
      .style('fill', function(d) {
          return `url(#shape_${d.ca})`
      })
    } else {
      svg.append('g')
      .selectAll("dot")
      .data(data)
      .attr("cx", function (d) { return x(d.x); } )
      .attr("cy", function (d) { return y(d.y); } )
      .join("circle")
      .attr("cx", function (d) { return x(d.x); } )
      .attr("cy", function (d) { return y(d.y); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d.ca) } )
    }
    


    let averagesList = [];
    for(let i = 0; i < categoryNum; i++) {
      averagesList.push(d3.mean(data.filter(function(d){ return d.ca == i.toString() }), function(d) { return d.y; }))
      $('#check-div').append(
        '<div class="col-sm">'+
          '<div class="form-check" '+'id="'+i.toString()+'-check-div">'+
            '<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">'+
              '<label class="form-check-label" for="flexRadioDefault1">'+
                '<div style="width: 23px; height: 23px; border-radius: 70%; background-color:'+palette['D3'][i]+';"></div>'+
              '</label>'+
            '</div>'+
          '</div>'
      )
    }

    maxCatIndex = averagesList.indexOf(Math.max(...averagesList)).toString();

  })
}

// $( "#show-ans-btn" ).click(function() {
//   const ansDivId = '#' + maxCatIndex + '-check-div'
//   $(ansDivId).css("border-style", "solid");
//   $(ansDivId).css("border-width", "2px");
//   $(ansDivId).css("border-color", "red");
// });

$( "#next-task-btn" ).click(function() {
  window.location.href = "task.html?task="+taskNum+"&cnt="+(parseInt(taskCnt)+1).toString();
});

$(document).ready(function(){
  genChart()
});


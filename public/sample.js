function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
const w = 400;
const h = 400;

let maxCatIndex;
let taskNum, taskCnt, useShape, colorPalette, colors, sampleCnt
let timeleft = 150;
let alreadyClick = false

const svg = d3.select("#task-div")
  .append("svg")
  .attr("width",  width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr('style', 'background-color: white')
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

function genChart() {
    const urlParams = new URLSearchParams(window.location.search);
    sampleCnt = urlParams.get('samplecnt');

    if (parseInt(sampleCnt) == 3) {
      $('#try-more-btn').hide()
    }

    fetch("color_palettes.json")
      .then(response => response.json())
      .then(function(json) {
          let colorName = json['DO9875JDFI']
          colors = colorName['value']
          shuffle(colors)

          d3.csv("./asset/sample-"+sampleCnt+".csv").then(function(data) {
            // d3.csv("./asset/example.csv").then(function(data) {
              const categoryNum = parseInt(data[data.length-1]['ca'])+1
              // for (let i = 0; i < categoryNum; i++) {
              //   let maple = svg.append('defs')
              //   .append('pattern')
              //   .attr('id', 'shape_'+i)
              //   .attr('patternUnits', 'objectBoundingBox')
              //   .attr('width', 10)
              //   .attr('height', 10)
              //   // Append svg to pattern
              //   .append('svg')
              //   .attr('x', 0)
              //   .attr('y', 0)
              //   .attr('width', 10)
              //   .attr('height', 10)

                // let filename = "s" + (i+1)
                // d3.xml("./asset/"+filename+".svg")
                // .then(data => {
                //   const node = document.createElement("style");
                //   const textnode = document.createTextNode(`.cls-${i+1}{fill:${colors[i]};}`);
                //   node.appendChild(textnode);
                //   data.getElementById(filename).appendChild(node)
                //   maple.node().append(data.documentElement)
                // });
              // }


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
            .range(colors)

          if (useShape == 'T') {
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
            .attr("r", 3.5)
            .style("fill", function (d) { return color(d.ca) } )
          }
          


          let averagesList = [];
          for(let i = 0; i < categoryNum; i++) {
            averagesList.push(d3.mean(data.filter(function(d){ return d.ca == i.toString() }), function(d) { return d.y; }))
            $('#check-div').append(
              '<div class="col-sm" style="background-color: white" id="ans-'+i.toString()+'">'+
                '<div class="form-check" '+'id="'+i.toString()+'-check-div">'+
                  '<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='+i.toString()+'>'+
                    '<label class="form-check-label" for="flexRadioDefault1">'+
                      '<div style="width: 23px; height: 23px; border-radius: 70%; background-color:'+colors[i]+';"></div>'+
                    '</label>'+
                  '</div>'+
                '</div>'
            )
          }

              $('input[type=radio]').on('change', function() {
                if (!alreadyClick) {
                  alreadyClick = true
                $('#ans-1').css('border-style', 'solid')
                $('#ans-1').css('border-width', '2px')
                $('#ans-1').css('border-color', 'red')
                $( "#ans-1" ).append( '<h6>This is the correct answer.</h6>' );
                }
            })
          
          
          maxCatIndex = averagesList.indexOf(Math.max(...averagesList)).toString();

        })

      });
}

$( "#try-more-btn" ).click(function() {
  window.location.href = "sample.html?samplecnt="+(parseInt(sampleCnt)+1).toString()
});

$( "#start-task-btn" ).click(function() {

  fetch("color_name_code.json")
    .then(response => response.json())
    .then(function(json) {
      const colorSelected = json[getRandomInt(10)]

      fetch("./asset/task_id_code.json")
        .then(response => response.json())
        .then(function(json) {
          
          const taskNum = json[getRandomInt(10)]
            let my_current_data = JSON.parse(localStorage.getItem('taskData'))
            my_current_data['task_info'] = {
              'task_id': taskNum,
              'color_palette': colorSelected,
              'time': Math.floor(Date.now() / 1000)
            }
            localStorage.setItem('taskData', JSON.stringify(my_current_data))
            window.location.href = "task.html?task="+taskNum+"&cnt=0&color="+colorSelected;
        })
  });
});

$(document).ready(function(){  
  genChart()
  $("#progresss-txt").text(sampleCnt+"/3")
  
});

var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Time remaining: 0";
  } else {
    document.getElementById("countdown").innerHTML = "Time remaining: " + timeleft/10 ;
  }
  timeleft -= 1;
}, 100);




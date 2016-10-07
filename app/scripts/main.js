'use stict'
$('.chosen-select').chosen();
$('.j-open-kalendae').click(function(){
  let btnDate = $(this);
  $('.j-date-picker-holder').css({'display':'none'});
  let calend = btnDate.closest('.j-calend-contein').find('.j-date-picker-holder');
  calend.css({'display':'block'});
});
$('.j-kalendae-close').click(function(){
    let btnClose = $(this);
    let calend = btnClose.closest('.j-calend-contein').find('.j-date-picker-holder');
    calend.css({'display':'none'});
});
$(document).on('click', '.k-active', function(){
  let btnDay = $(this);
  let dayData = btnDay.data('date');
  let fild = btnDay.closest('.j-calend-contein').find('.j-date-fild');
  let calend = btnDay.closest('.j-calend-contein').find('.j-date-picker-holder');
  fild.prop('value', dayData);
  calend.css({'display':'none'});
});

$('.j-stacked-bar-chart').each(function(){
   let obj = $(this);
   let data = obj.data('csv');
   let id = '#'+obj.attr('id');
   let margin = {top: 10, right: 10, bottom: 10, left: 10}
   let height = 178 - margin.bottom - margin.top;
   let width = 480 - margin.left - margin.right;
   let x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
   let y = d3.scaleLinear()
            .range([height, 0]);
   let stackedChart = d3.select(id)
   .append('svg:svg')
   .attr('viewBox','0 0 480 178')
   .attr('preserveAspectRatio','xMinYMin')
   .append('g')
   .attr('transform','translate(' + margin.left + ',' + margin.top + ')');
   d3.csv(data, function(error, data) {
       if (error) throw error;
       let arrHeight = [];
       data.forEach(function(d) {
         d.norm = parseFloat(d.norm);
         d.stack =  parseFloat(d.stack);
         arrHeight.push(d.norm+d.stack);
         //console.log(d.norm, d.stack);
       });
       x.domain(data.map(function(d) { return d.State; }));
       y.domain([0, d3.max(data, function(d) {return d.norm;})]);
       stackedChart.selectAll('.bar-norm')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar-norm')
        .attr('x', function(d) { return x(d.State); })
        .attr('width', x.bandwidth())
        .attr('y', function(d) { return y(d.norm); })
        .attr('height', function(d) { return height - y(d.norm);});
   });
});







var todayStart = new Date;
todayStart.setHours(9,0);
todayStart = Date.parse(todayStart);
var todayEnd = new Date;
todayEnd.setHours(18,0);
todayEnd = Date.parse(todayEnd);

console.log(todayStart);

var testData = {
  'alltime':[1474869638000,1474902030000],
  'orders':[
            [1474869638000,1474872013000,123],
            [1474872013000,1474881322000,124],
            [1474884952000,1474889412000,125]
          ],
  'breaks':[
            [1474881312000,1474884926000,1],
            [1474894857000,1474896617000,2],
          ],
  'done':[
            [1474869638000,1474871405000,1]

          ]
};

let margin = {top: 20, right: 15, bottom: 15, left: 60}
  , width = 600 - margin.left - margin.right
  , height = 150 - margin.top - margin.bottom;
let start = testData.alltime[0];
let end = testData.alltime[1];
let range = [0, 600];
let time = d3.scaleTime().domain([start, end]).range([margin.left, width]);
let parseDateHour = d3.timeFormat('%H:%M');
let timeLine = d3.select('#work-time')
.append('svg:svg')
.attr('viewBox','0 0 600 150')
.attr('preserveAspectRatio','xMinYMin');
let startTime = parseDateHour(testData.alltime[0].toString());
let endTime = parseDateHour(testData.alltime[1].toString());
let timeLineHeight = 40;
let axisScale = d3.scaleTime()
                       .domain([testData.alltime[0], testData.alltime[1]])
                       .range([margin.left, width]);

let xAxis = d3.axisBottom()
              .scale(axisScale)
              .tickFormat(d3.timeFormat('%H'));

//Create an SVG group Element for the Axis elements and call the xAxis function
let xAxisGroup = timeLine.append('g')
                          .call(xAxis)
                          .attr('transform', 'translate(0,' + height + ')');

timeLine.append('line')
.attr('class', 'j-grain')
.attr('x1', function() {return time(testData.alltime[0])})
.attr('x2', function() {return time(testData.alltime[0])})
.attr('transform', 'translate(0,' + (height-60)+ ')')
.attr('y2','60')
.attr('stroke', '#8e8e8e')
.attr('stroke-width', '2');
timeLine.append('text')
.attr('class', 'j-grain-text')
.attr('x', margin.left-20)
.attr('y','50')
.attr('fill', '#000')
.attr('font-size', '14px')
.text(startTime);

timeLine.append('line')
.attr('class', 'j-grain')
.attr('x1', function() {return time(testData.alltime[1])})
.attr('x2', function() {return time(testData.alltime[1])})
.attr('transform', 'translate(0,' + (height-60)+ ')')
.attr('y2','60')
.attr('stroke', '#8e8e8e')
.attr('stroke-width', '2');
timeLine.append('text')
.attr('class', 'j-grain-text')
.attr('x', function(d) {return  time(testData.alltime[1])-20;})
.attr('y','50')
.attr('fill', '#000')
.attr('font-size', '14px')
.text(endTime);

timeLine.selectAll('.order')
        .data(testData.orders)
        .enter().append('rect')
        .attr('class','order')
        .attr('fill','#e6e6e6')
        .attr('x', function(d) { console.log(d.length);return  time(d[0]);})
        .attr('transform', 'translate(0,' + (height-timeLineHeight)+ ')')
        .attr('width', function(d) {let timeEnd = time(d[1]); let timeStart = time(d[0]); return timeEnd-timeStart;})
        .attr('height', timeLineHeight)
        .attr('data-num', function(d) {return d[2]})
        ;
timeLine.selectAll('.breaks')
        .data(testData.breaks)
        .enter().append('rect')
        .attr('class','breacks')
        .attr('fill','#61b0ff')
        .attr('x', function(d) {return  time(d[0]);})
        .attr('transform', 'translate(0,' + (height-timeLineHeight)+ ')')
        .attr('width', function(d) {let timeEnd = time(d[1]); let timeStart = time(d[0]); return timeEnd-timeStart;})
        .attr('height', timeLineHeight)
        .attr('data-num', function(d) {return d[2]})
        ;
timeLine.selectAll('.done')
        .data(testData.done)
        .enter().append('rect')
        .attr('class','breacks')
        .attr('fill','#e53b18')
        .attr('x', function(d) {return  time(d[0]);})
        .attr('transform', 'translate(0,' + (height-timeLineHeight)+ ')')
        .attr('width', function(d) {let timeEnd = time(d[1]); let timeStart = time(d[0]); return timeEnd-timeStart;})
        .attr('height', timeLineHeight)
        .attr('data-num', function(d) {return d[2]})
        ;
timeLine.append('line')
.attr('class', 'j-all')
.attr('x1', function() {return time(testData.alltime[0])})
.attr('x2', function() {return time(testData.alltime[0])})
.attr('y2','140')
.attr('y1','140')
.attr('stroke', '#175289')
.attr('stroke-width', '10')
.transition()
.duration(1944000)
.attr('x2', function() {return time(testData.alltime[1])});


$('.j-clock').each(function(){
  let clock = $(this);
  let time = parseInt(clock.data('time'));
  let sec = time*60;
  let part = sec/12;
  let leftTime = 0;
  $('.j-left-time').text(leftTime);
  $('.j-all-time').text(time);
  $('.j-small-circle').each(function(){
     let circle = $(this);
     let data = parseFloat(circle.data('num'));
     let delay = data * part*1000;
     setTimeout(function()
                      {
                        circle.attr('fill', '#e53b18');
                      }, delay);

  });
  let timer = setInterval(function(){
    leftTime++
    if(leftTime === time){
      clearInterval(timer);
      $('#circle circle').attr('stroke', '#e53b18');
    }
    $('.j-left-time').text(leftTime);

  }, 60000);

  $('#circle').css({'animation': 'dash '+sec+'s linear forwards'});

});

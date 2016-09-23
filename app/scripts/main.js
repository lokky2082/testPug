'use stict'
$('.chosen-select').chosen();
$('.j-open-kalendae').click(function(){
  var btnDate = $(this);
  $('.j-date-picker-holder').css({'display':'none'});
  var calend = btnDate.closest('.j-calend-contein').find('.j-date-picker-holder');
  calend.css({'display':'block'});
});
$('.j-kalendae-close').click(function(){
    var btnClose = $(this);
    var calend = btnClose.closest('.j-calend-contein').find('.j-date-picker-holder');
    calend.css({'display':'none'});
});
$(document).on('click', '.k-active', function(){
  var btnDay = $(this);
  var dayData = btnDay.data('date');
  var fild = btnDay.closest('.j-calend-contein').find('.j-date-fild');
  var calend = btnDay.closest('.j-calend-contein').find('.j-date-picker-holder');
  fild.prop('value', dayData);
  calend.css({'display':'none'});
});
var todayStart = new Date;
todayStart.setHours(18,0,0);
todayStart = Date.parse(todayStart);
var todayEnd = new Date;
todayEnd.setHours(18);
todayEnd = Date.parse(todayEnd);

console.log(todayStart);
var testData = {
  'alltime':[1474524000000,1474556400000],
  'orders':[
            [1474524000000,1474527639000,123],
            [1474559739000,1474534867000,124],
            [1474553272000,1474556892000,125]
          ],
  'breaks':{
    '1':{'start-time':1474534867000, 'end-time':1474538495000},
    '2':{'start-time':1474549460000, 'end-time':1474551057000}
  }
};

let margin = {top: 20, right: 15, bottom: 15, left: 60}
  , width = 600 - margin.left - margin.right
  , height = 100 - margin.top - margin.bottom;
let start = testData.alltime[0];
let end = testData.alltime[1];
let range = [0, 600];
let time = d3.scaleTime().domain([start, end]).range([margin.left, width]);
let timeLine = d3.select('#work-time')
.append('svg:svg')
.attr('viewBox','0 0 600 100')
.attr('preserveAspectRatio','xMinYMin');
let scaleFactor  = 1/(testData.alltime[1] - testData.alltime[0]) * width;

console.log(scaleFactor);
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

timeLine.selectAll('rect')
        .data(testData.orders)
        .enter().append('rect')
        .attr('class','order')
        .attr('fill','red')
        .attr('x', function(d) { console.log(d.length);return  time(d[0]);})
        .attr('y','20')
        .attr('width', function(d) {let timeEnd = time(d[1]); let timeStart = time(d[0]); return timeEnd-timeStart;})
        .attr('height', '40')
        ;


/*d3.csv('readme.csv', type, function(error, data) {

});*/
//timeLine();

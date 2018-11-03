
var margin={right:10, left:100, top:10, bottom:100}

var height=700 -margin.left-margin.right;
var width=800 -margin.top -margin.bottom;

var svg=d3.select('#chart-area').append('svg')
    .attr('width',width +margin.left+margin.right)  
    .attr('height',height +margin.top +margin.bottom)
    .append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")");

svg.append("text")
    .attr("class","x axis-label")
    .attr("x", width/2)
    .attr("y",height+80)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Semester");

svg.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform","rotate(-90)")
    .text(" CGPA (out of 10)");
 


d3.csv('data/cgpa.csv').then(function(data){
    
        data.forEach(function(data)
        {
            data.CGPA=+data.CGPA;
        });


        var x=d3.scaleBand()
            .domain(data.map(function(d){
                return d.Semester;
            }))
            .range([0,width])
            .paddingInner(0.3)
            .paddingOuter(0.3);

        var y = d3.scaleLinear()
        .domain([0, d3.max(data,function(d){
            return d.CGPA;
        })])
        .range([height, 0]);
        
        var xAxisCall =d3.axisBottom(x);
        svg.append("g")
            .attr("class","X axis")
            .attr("transform","translate(0,"+height+")") 
            .call(xAxisCall)
            .selectAll("text")
                .attr("y","10")
                .attr("x","-5")
                .attr("text-anchor","end")
                .attr("transform","rotate(-40)")               


        var yAsixCall=d3.axisLeft(y)
            .ticks(20)
            .tickFormat(function(d){
                return d;
            })
            svg.append("g")
                .attr("class"," y axis")
                .call(yAsixCall);
        
        var rectangle=svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y",function(d){
                console.log("*****"+y(d.CGPA))
                return y(d.CGPA);
            })
            .attr("x",function(d){
                console.log("---"+x(d.Semester));
                return x(d.Semester);
            })
            .attr("width",x.bandwidth)
            .attr("height",function(d){
                console.log((height- y(d.CGPA)));
                return (height- y(d.CGPA));
            })
            .attr("fill",function(d,i){
               
                if(d.CGPA>9.5)
                    return "#004080"
                else if(d.CGPA>9.0&&d.CGPA<9.5)
                    return "#80bfff"
                    else if(d.CGPA>8.8&&d.CGPA<=9.0)
                        return "#ffd480"
                        else if(d.CGPA>8.5&&d.CGPA<8.8)
                                return "#33cc33"
                            else if(d.CGPA<8 ) return "#804000"
                        
               
           //     return  d3.scaleOrdinal(d3.schemeDark2);
            })
            .on('mouseenter', function (d, i) {
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr('opacity', 0.6)
                  .attr('x', (a) => x(d.Semester) - 5)
                  .attr('width', x.bandwidth() + 10)
        
                const l =y(d.CGPA)
                console.log("length ----"+l)
        
                line1 = svg.append('line')
                  .attr('id', 'limit')
                  .attr('x1', 0)
                  .attr('y1', l)
                  .attr('x2', width)
                  .attr('y2', l)
                  .style("stroke-dasharray","5,5")//dashed array for line
                  .attr('stroke-width',3)
                  .style("stroke", 'black');

        
                svg.append('text')
                  .attr('class', 'divergence')
                  .attr('x', (a) => x(d.Semester) + x.bandwidth() / 2)
                  .attr('y', (a) => y(d.CGPA) + 30)
                  .attr('fill', 'black')
                  .attr('text-anchor', 'middle')
                  .attr('width',10)
                  .style("font-size", "30px")
                  .text(d.CGPA)

              })
              .on('mouseleave', function (d) {
        
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr('opacity', 1)
                  .attr('x', (a) => x(d.Semester) )
                  .attr('width', x.bandwidth())

                  svg.selectAll('#limit').remove()
                  svg.selectAll('.divergence').remove()

              })
        
});    

var height=600;
var width=400;

var svg=d3.select('#chart-area').append('svg')
    .attr('width',width)
    .attr('height',height);

d3.csv('data/cgpa.csv').then(function(data){
    
        data.forEach(function(data)
        {
            data.CGPA=+data.CGPA;
        });
        console.log(data);
    
});    

/*
var margin ={ left:100, right:10, top:10, bottom:150}

var width=600-margin.left-margin.right;
var height=400-margin.top - margin.bottom;

var svg=d3.select("#chart-area").append("svg")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
        .append("g")
            .attr("tranform", "translate("+margin.left+","+margin.top+")");

var g =svg.append("g")
    .attr("transform", "translate(" + margin.left + ", "+margin.top + ")")

g.append("text")
    .attr("class","x axis-label")
    .attr("x", width/2)
    .attr("y",height+140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("The word's Tallest building");

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height/2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform","rotate(-90)")
    .text("Height (m)");
 

d3.json("data/buildings.json").then(function(data){
    console.log(data);
    
    data.forEach(function(d){
        d.height= +d.height;
    });

    var x=d3.scaleBand()
        .domain(data.map(function(d){
            return d.name;
        }))
        .range([0,width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

        console.log(x)


    var y = d3.scaleLinear()
        .domain([0, d3.max(data,function(d){
            return d.height;
        })])
        .range([0, height]);
    
    var xAxisCall =d3.axisBottom(x);
    g.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0,"+height+")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform" , "rotate(-40)");
    
    var yAsixCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(function(d){
            return d+"m";
        })
    g.append("g")
        .attr("class","y axis")
        .call(yAsixCall);

    var rectangle =g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y",20)
        .attr("x",function(d,i){
            return x(d.name);
        })
        .attr("width",x.bandwidth)
        .attr("height",function(d){
            return y(d.height);
        })
        .attr("fill",function(d){
            return "grey";
        });

});

// circle.enter()    
//     .append("circle")
//         .attr("cx",function(d,i){
//             console.log("Item : "+d,"Index: "+i);
//             return (i*50)+25;
//         })
//         .attr("cy",200)
//         .attr("r",function(d){
//             console.log("Item : "+d);
//             return d;
//         })
//         .attr("fill","blue");

*/
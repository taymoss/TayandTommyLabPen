var penPromise = d3.json("penguins/classData.json");

penPromise.then (function(penguins)
{
    
    makeGraph(penguins);
    
}),
    function(err) 
{
        console.log("No penguins today!!!!!")
}

var screen = {width: 700, height: 800};
var margins =   {top:20, right:75, bottom:75, left:75};   




var makeGraph = function(penguins)
{
    
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width = screen.width  - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear().domain([0,38]).range([0,width])
    var yScale = d3.scaleLinear().domain([0, 10]). range([height, 0])
    
     var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom (xScale);
    var yAxis = d3.axisLeft (yScale);
    d3.select("svg").append("g").classed("axis", true);
    
    d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    
     d3.select("body")
        .selectAll("button")
        .data(penguins)
        .enter()
        .append("button")
        .on("click", function(penguin, position){
         createGraph(penguins, xScale, yScale, cScale, position)
     })
        .append("img")
        .attr("src", function(penguin){
         return "penguins/"+penguin.picture
     })
    
    
    
    
     d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(25, "+margins.top+")")
    .call(yAxis);
    
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins[0].quizes)
    .enter()
    .append("circle")
    
    
    createGraph(penguins, xScale, yScale, cScale, 0);
}
    var createGraph = function(penguins, xScale, yScale, cScale, index)
    {
        
      
    var arrays = d3.select("#graph")
            .selectAll("circle")
            .data(penguins[index].quizes)
            .transition()
            .attr("fill", function(){
                return cScale(penguins[index].quizes.grade)
            })
            .attr("cx", function(num,index)
                  {
                return xScale(index);
            })
            .attr("cy",function(num)
                  {
                return yScale(num.grade);
            })
            .attr("r", 3)
           
    
    

}
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

//function buildPlot() {
  
  d3.json("data/samples.json").then((data) => {
    console.log(data);
 
    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);     

    var sampleValues940Sliced = sampleValuesArray[0].slice(0, 10);
    var otuIds940Sliced = otuIds[0].slice(0, 10);
    var otuLabels940Sliced = otuLabels[0].slice(0, 10);
    console.log("sampleValues940Sliced: ", sampleValues940Sliced);
    console.log("otuIds940Sliced: ", otuIds940Sliced);
    console.log("otuLabels940Sliced: ", otuLabels940Sliced);
    
    var otuIds940SlicedString = otuIds940Sliced.map(String);
//    console.log("otuIds940SlicedString: ", otuIds940SlicedString)

    otuIds940SlicedString.forEach(function(element, index) {
      otuIds940SlicedString[index] = 'OTU ' + element;
    });
    console.log("otuIds940SlicedString: ", otuIds940SlicedString)

    // Reverse the array to accommodate Plotly's defaults
    reversedSampleValues940Sliced = sampleValues940Sliced.reverse();
    reversedOtuIds940SlicedString = otuIds940SlicedString.reverse();
    reversedOtuLabels940Sliced = otuLabels940Sliced.reverse();

    var trace1 = {
      x: reversedSampleValues940Sliced,
      y: reversedOtuIds940SlicedString,
      text: reversedOtuLabels940Sliced,
      name: "OTUs",
      type: "bar",    
      orientation: "h"      
    };

    // Create the data array for the plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
      title: "Top 10 OTUs",
  //    yaxis=dict(autorange="reversed")
  //    xaxis: { title: "Organ" },
  //    yaxis: { title: "Square Root of Survival" }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);  

    });
//}

//buildPlot();
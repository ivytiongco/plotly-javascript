d3.json("data/samples.json").then(function(data) {
  console.log(data);

  // we need first 10 sample values, but NEED TO CHANGE 0-9 TO CORRECT THING
  var sampleValues = data.samples.sample_values.map(row => row[0-9]);
    console.log(sampleValues);

  var otu = data.samples.sample_values.map(row => row[0-9]);
    console.log(otu);


  //  Create the Traces
  var trace1 = {
    x: data.samples.otu_ids,
    y: sampleValues,
    type: "bar",    
    orientation: "h"
  };

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 OTUs",
//    xaxis: { title: "Organ" },
//    yaxis: { title: "Square Root of Survival" }
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("bar", data, layout);
});

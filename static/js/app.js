//function unpack(rows, index) {
//  return rows.map(function(row) {
//    return row[index];
//  });
//}

//function buildPlot() {
  
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Demographic Info panel - HOW TO INSERT KEY, VALUE PAIRS????
    var metadata940 = data.metadata[0];
//    var metadata940 = Object.entries(data.metadata[0]);
    console.log("metadata940: ", metadata940);

    for (let [key, value] of Object.entries(metadata940)) {
      var metadata940Entries = `${key}: ${value}`;
      console.log(`${key}: ${value}`);      
    }

    console.log("metadata940Entries: ", metadata940Entries);

//    var metadata940entries = 
    
//    var selection = d3.select(".panel-body")
//      .data(metadata940)
//      .enter()
//      .append("div");

    var ul = d3.select(".panel-body").append("ul");

    var selection = ul.selectAll("li") // creates virtual selection
      .data([metadata940Entries]) // binds data
      .enter()
      .append("li") // appends li element for each item in array (since there are currently none)
      .attr("style", "list-style-type: none")
      .text(function(d) {
        return d;
      }); // sets the text of each element to match the items in array




    // Horizontal bar chart 
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
      title: "Top 10 OTUs"  
    };

    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);  


    // Bubble chart
    var trace2 = {
      x: otuIds[0],
      y: sampleValuesArray[0],
      text: otuLabels[0],
      mode: 'markers',
      marker: {
        size: sampleValuesArray[0],
        color: otuIds[0]
      }
    };
    
    var data2 = [trace2];
    
    var layout2 = {
  //    title: 'Marker Size',
      xaxis: {
        title: {
          text: "OTU ID"
        }
      },
      showlegend: false  
    };
    
    Plotly.newPlot('bubble', data2, layout2);

    


  


});
//buildPlot();
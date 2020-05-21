// Add Subject IDs to dropdown menu
d3.json("data/samples.json").then((data) => {

  var subjectID = data.names;
  console.log("subjectID: ", subjectID);

  // Add list of metadata to panel
  var ul = d3.select("#selDataset");

  var selection = ul.selectAll("li") // creates virtual selection
    .data(subjectID) // binds data
    .enter()
    .append("option") // appends li element for each item in array (since there are currently none)
//    .value()
    .text(function(d) {
      return d;
    }); // sets the text of each element to match the items in array
  });

// Initializes the page with a default plot
function init() {
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // IF/WHEN TO USE THIS??? HOW TO PUT VALUES IN DROPDOWN???
    // DO WE NEED TO USE FUNCTION optionChanged FROM INDEX.HTML SOMEHOW?
    // https://www.w3schools.com/tags/ev_onchange.asp
    // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_onchange2
    // Create array of Subject IDs to use for dropdown menu
    var subjectID = data.names;
    console.log("subjectID: ", subjectID);

    
    // Demographic Info panel
    var metadata940 = data.metadata[0];
    console.log("metadata940: ", metadata940);

    // Create empty array to later hold metadata objects
    var metadata940Entries = []

    // Add key-value text to empty array
    for (let [key, value] of Object.entries(metadata940)) {
      metadata940Entries.push(`${key}: ${value}`);
    }    
    console.log("metadata940Entries: ", metadata940Entries);

    // Add list of metadata to panel
    var ul = d3.select(".panel-body").append("ul");

    var selection = ul.selectAll("li") // creates virtual selection
      .data(metadata940Entries) // binds data
      .enter()
      .append("li") // appends li element for each item in array (since there are currently none)
      .attr("style", "list-style: none")
      .style("font-weight", 700)
      .text(function(d) {
        return d;
      }); // sets the text of each element to match the items in array

    // Horizontal bar chart 

    // Get all sample values into one array, same for OTU IDs and OTU Labels
    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);    

    // Since sample values are already in descending order, slice to get first 10 values
    var sampleValues940Sliced = sampleValuesArray[0].slice(0, 10);
    var otuIds940Sliced = otuIds[0].slice(0, 10);
    var otuLabels940Sliced = otuLabels[0].slice(0, 10);
    console.log("sampleValues940Sliced: ", sampleValues940Sliced);
    console.log("otuIds940Sliced: ", otuIds940Sliced);
    console.log("otuLabels940Sliced: ", otuLabels940Sliced);
    
    // Convert OTU IDs to string and add OTU before each one
    var otuIds940SlicedString = otuIds940Sliced.map(String);
    console.log("otuIds940SlicedString: ", otuIds940SlicedString)

    otuIds940SlicedString.forEach(function(element, index) {
      otuIds940SlicedString[index] = 'OTU ' + element;
    });
    console.log("otuIds940SlicedString: ", otuIds940SlicedString)

    // Reverse the array to accommodate Plotly's defaults
    reversedSampleValues940Sliced = sampleValues940Sliced.reverse();
    reversedOtuIds940SlicedString = otuIds940SlicedString.reverse();
    reversedOtuLabels940Sliced = otuLabels940Sliced.reverse();

    // Create trace
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
}



// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;  

//  if (dataset === '940') {
//      x = [1, 2, 3, 4, 5];
//      y = [1, 2, 4, 8, 16];
//    }
  
  // Note the extra brackets around 'x' and 'y'
//  Plotly.restyle("bar", "x", [x]);
//  Plotly.restyle("bubble", "y", [y]);
//  Plotly.restyle("bubble", "y", [y]);
}


init();
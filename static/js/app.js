// Initializes the page with default plots for Subject 940
function init() {
  
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Add Subject IDs to dropdown menu
    var subjectID = data.names;
    console.log("subjectID: ", subjectID);

    // Add list of metadata to panel
    var dropdown = d3.select("#selDataset");

    var selection = dropdown.selectAll("option") // creates virtual selection
      .data(subjectID) // binds data
      .enter()
      .append("option") // appends li element for each item in array (since there are currently none)
      .text(function(d) {
        return d;
      }); // sets the text of each element to match the items in array
    
    getMetadata(0);

    barChart(0)

    bubbleChart(0)
  });
}

init();


// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

// Dropdown handler
function optionChanged() {

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;  
  console.log("***************dataset: ", dataset, typeof(dataset));

  // Run functions to build Demographic panel, bar chart, bubble chart
  getMetadata(parseInt(dataset));

  barChart(parseInt(dataset));

  bubbleChart(parseInt(dataset));

}  

// Function to get metadata
function getMetadata(i) {
  console.log("*******i: ", i);

  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Demographic Info panel
    var metadata = data.metadata[data.metadata.findIndex(m => m.id === i)];
    console.log("metadata: ", metadata);

    var ul = d3.select(".panel-body").append("ul");

    var selection = ul.selectAll("li") // creates virtual selection
      .data(metadata) // binds data
      .enter()
      .append("li") // appends li element for each item in array (since there are currently none)
      .attr("style", "list-style: none")
      .style("font-weight", 700)
      .text(function(d) {
        return d;
      }); // sets the text of each element to match the items in array
  });
}


// Horizontal bar chart 
function barChart(i) {
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);
    
    // Get all sample values into one array, same for OTU IDs and OTU Labels
    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);    

    // Since sample values are already in descending order, slice to get first 10 values
    var sampleValuesSliced = sampleValuesArray[i].slice(0, 10);
    var otuIdsSliced = otuIds[i].slice(0, 10);
    var otuLabelsSliced = otuLabels[i].slice(0, 10);
    console.log("sampleValuesSliced: ", sampleValuesSliced);
    console.log("otuIdsSliced: ", otuIdsSliced);
    console.log("otuLabelsSliced: ", otuLabelsSliced);
    
    // Convert OTU IDs to string and add OTU before each one
    var otuIdsSlicedString = otuIdsSliced.map(String);
    console.log("otuIdsSlicedString: ", otuIdsSlicedString)

    otuIdsSlicedString.forEach(function(element, index) {
      otuIdsSlicedString[index] = 'OTU ' + element;
    });
    console.log("otuIdsSlicedString: ", otuIdsSlicedString)

    // Reverse the array to accommodate Plotly's defaults
    reversedSampleValuesSliced = sampleValuesSliced.reverse();
    reversedOtuIdsSlicedString = otuIdsSlicedString.reverse();
    reversedOtuLabelsSliced = otuLabelsSliced.reverse();

    // Create trace
    var trace1 = {
      x: reversedSampleValuesSliced,
      y: reversedOtuIdsSlicedString,
      text: reversedOtuLabelsSliced,
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
  });
}

// Bubble chart
function bubbleChart(i) {
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Get all sample values into one array, same for OTU IDs and OTU Labels
    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);   

    var trace2 = {
      x: otuIds[i],
      y: sampleValuesArray[i],
      text: otuLabels[i],
      mode: 'markers',
      marker: {
        size: sampleValuesArray[i],
        color: otuIds[i]
      }
    };

    var data2 = [trace2];

    var layout2 = {
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
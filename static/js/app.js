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

    barChart(940)

    bubbleChart(940)
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

// Demographic Info panel displaying metadata
function getMetadata() {
//  console.log("******* getMetadata i: ", i);

  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Find index by id
  //  var index = data.samples.findIndex(m => m.id == i);
  //  console.log("********** metadata index: ", index);

    // Demographic Info panel
  //  var metadata = data.metadata[data.metadata.findIndex(m => m.id === i)];
  //  console.log("data.metadata.findIndex(m => m.id === i): ", data.metadata.findIndex(m => m.id === i));
  //  console.log("***********metadata: ", metadata);

  //  var demoPanel = d3.select("#sample-metadata")
  //    .data(metadata)
  //    .append("p")
  //    .text(metadata); 

  //  console.log("demoPanel: ", demoPanel)

    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(i).forEach(function ([key, value]) {
      var row = sample_metadata.append("p");
      row.text(`${key}: ${value}`);
    });    
  });
}

    

    // clear demographic data
  //  demographicData.html("");
    
  //  var demoPanel = d3.select('#sample-metadata');

  //  for (var i = 0; i < metadata.length; i++) {
  //    demoPanel.append("p").text(`${metadata[i]}`);
  //    console.log("demoPanel: ", demoPanel)
  //  };   

  //  var demoPanel = d3.select("#sample-metadata")
    //  .data(metadata)
  //    .append("p")
  //    .text(function(d) {
  //      return Object.entries(d);     
  //    });


  //  var selection = ul.selectAll("li") // creates virtual selection
  //    .data(metadata) // binds data
  //    .enter()
  //    .append("li") // appends li element for each item in array (since there are currently none)
  //    .attr("style", "list-style: none")
  //    .style("font-weight", 700)
  //    .text(function(d) {
  //      return d;
  //    }); // sets the text of each element to match the items in array
//  });



// Horizontal bar chart 
function barChart(i) {
  console.log("********* barChart i: ", i);

  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Find index by id
    var index = data.samples.findIndex(m => m.id == i);
    console.log("********** bar chart index: ", index);
    
    // Get all sample values into one array, same for OTU IDs and OTU Labels
    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);    
    console.log("sampleValuesArray: ", sampleValuesArray);
    console.log("otuIds: ", otuIds);
    console.log("otuLabels: ", otuLabels);

    // Since sample values are already in descending order, slice to get first 10 values
    var sampleValuesSliced = sampleValuesArray[index].slice(0, 10);
    var otuIdsSliced = otuIds[index].slice(0, 10);
    var otuLabelsSliced = otuLabels[index].slice(0, 10);
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

    // Find index by id
    var index = data.samples.findIndex(m => m.id == i);
    console.log("********** bubble chart index: ", index);

    // Get all sample values into one array, same for OTU IDs and OTU Labels
    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);   

    var trace2 = {
      x: otuIds[index],
      y: sampleValuesArray[index],
      text: otuLabels[index],
      mode: 'markers',
      marker: {
        size: sampleValuesArray[index],
        color: otuIds[index]
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
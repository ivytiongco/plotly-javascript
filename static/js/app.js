// Add Subject IDs to dropdown menu
d3.json("data/samples.json").then((data) => {

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
  });


// Initializes the page with default plots for Subject 940
function init() {
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

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


init();

// WHAT TO DO NEXT ????????????????????

// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);


// Dropdown handler
function optionChanged() {

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;  
  console.log("dataset: ", dataset);

  // Build the plot with the new value
  buildPlot(dataset);
}

// Function to build plots based on dropdown value chosen
function buildPlot(dataset) {
  // Load data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Demographic Info panel
    var metadata941 = data.metadata[1];
    console.log("metadata941: ", metadata941);

    // Create empty array to later hold metadata objects
    var metadata941Entries = []

    // Add key-value text to empty array
    for (let [key, value] of Object.entries(metadata941)) {
      metadata941Entries.push(`${key}: ${value}`);
    }    
    console.log("metadata941Entries: ", metadata941Entries);

    // Add list of metadata to panel
    var ul = d3.select(".panel-body").append("ul");

    var selection = ul.selectAll("li") // creates virtual selection
      .data(metadata940Entries) // binds data
    //  .enter()
    //  .append("li") // appends li element for each item in array (since there are currently none)
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
    var sampleValues941Sliced = sampleValuesArray[1].slice(0, 10);
    var otuIds941Sliced = otuIds[1].slice(0, 10);
    var otuLabels941Sliced = otuLabels[1].slice(0, 10);
    console.log("sampleValues941Sliced: ", sampleValues941Sliced);
    console.log("otuIds941Sliced: ", otuIds941Sliced);
    console.log("otuLabels941Sliced: ", otuLabels941Sliced);
    
    // Convert OTU IDs to string and add OTU before each one
    var otuIds941SlicedString = otuIds941Sliced.map(String);
    console.log("otuIds941SlicedString: ", otuIds941SlicedString)

    otuIds941SlicedString.forEach(function(element, index) {
      otuIds941SlicedString[index] = 'OTU ' + element;
    });
    console.log("otuIds941SlicedString: ", otuIds941SlicedString)

    // Reverse the array to accommodate Plotly's defaults
    reversedSampleValues941Sliced = sampleValues940Sliced.reverse();
    reversedOtuIds941SlicedString = otuIds941SlicedString.reverse();
    reversedOtuLabels941Sliced = otuLabels941Sliced.reverse();

    // Create trace
    var trace1 = {
      x: reversedSampleValues941Sliced,
      y: reversedOtuIds941SlicedString,
      text: reversedOtuLabels941Sliced,
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
      x: otuIds[1],
      y: sampleValuesArray[1],
      text: otuLabels[1],
      mode: 'markers',
      marker: {
        size: sampleValuesArray[1],
        color: otuIds[1]
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





// Initializes the page with default plots for Subject 940
function init() {
    // Load data
    d3.json("data/samples.json").then((data) => {
      console.log(data);
  
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
  
  // HOW TO USE EACH SUBJECT'S DATA??? 
  // FOR EACH USING i AND COPY CODE FOR ALL PLOTS?
  // USE SWITCH OR JUST IF STATEMENTS?
  // https://ucsd.bootcampcontent.com/UCSD-Coding-Bootcamp/ucsd-sd-data-pt-01-2020-u-c/blob/master/01-Lesson-Plans/15-Interactive-Visualizations-and-Dashboards/3/Activities/02-Stu_Switch/Solved/plots.js
  // https://ucsd.bootcampcontent.com/UCSD-Coding-Bootcamp/ucsd-sd-data-pt-01-2020-u-c/blob/master/01-Lesson-Plans/15-Interactive-Visualizations-and-Dashboards/2/Activities/08-Ins_Dropdown_Events/Solved/plots.js
  
  //  if (dataset === '940') {
  //      x = [1, 2, 3, 4, 5];
  //      y = [1, 2, 4, 8, 16];
  //    }
  
    for (var i = 0; i < 12; i++) {
  
      // Demographic Info panel
      var metadata = data.metadata[i];
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
        xaxis: {
          title: {
            text: "OTU ID"
          }
        },
        showlegend: false  
      };
      
      Plotly.newPlot('bubble', data2, layout2);
  
    }
    
    });
    
    // Note the extra brackets around 'x' and 'y'
  //  Plotly.restyle("bar", "x", [x]);
  //  Plotly.restyle("bubble", "y", [y]);
  }
  
  
  init();
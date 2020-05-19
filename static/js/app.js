function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

//function buildPlot() {
  
  d3.json("data/samples.json").then((data) => {
    console.log(data);

    // Promise Pending
//    const dataPromise = d3.json("data/samples.json");
//    console.log("Data Promise: ", dataPromise);


//    for (var i = 0; i < 10; i++) {
//      var sampleValues = unpack(data.samples.sample_values, i);
//      var otuIds = unpack(data.samples.otu_ids, i);
//      var otuLabels = unpack(data.samples.otu_labels, i);
//    }

    var sampleValuesArray = data.samples.map(object => object.sample_values); 
    var otuIds = data.samples.map(object => object.otu_ids); 
    var otuLabels = data.samples.map(object => object.otu_labels);     
//    console.log("sampleValuesArray: ", sampleValuesArray);
//    console.log("otuIds: ", otuIds);
//    console.log("otuLabels: ", otuLabels);

//    var sampleValues940 = sampleValuesArray[0]
//    console.log("sampleValues940: ", sampleValues940);

//    var sampleValues940Sorted = sampleValuesArray[0].sort((a, b) => b.sampleValuesArray[0] - a.sampleValuesArray[0]);
//    var otuIds940Sorted = otuIds[0].slice(0, 10);
//    var otuLabels940Sorted = otuLabels[0].slice(0, 10);
//    console.log("sampleValues940Sorted: ", sampleValues940Sorted);
//    console.log("otuIds940Sorted: ", otuIds940Sorted);
//    console.log("otuLabels940Sorted: ", otuLabels940Sorted);

    var sampleValues940Sliced = sampleValuesArray[0].slice(0, 10);
    var otuIds940Sliced = otuIds[0].slice(0, 10);
    var otuLabels940Sliced = otuLabels[0].slice(0, 10);
    console.log("sampleValues940Sliced: ", sampleValues940Sliced);
    console.log("otuIds940Sliced: ", otuIds940Sliced);
    console.log("otuLabels940Sliced: ", otuLabels940Sliced);
    
    var otuIds940SlicedString = otuIds940Sliced.map(String);
    console.log("otuIds940SlicedString: ", otuIds940SlicedString)

    var otuIds940SlicedLabels = otuIds940SlicedString.forEach(function(element, index) {
      otuIds940SlicedString[index] = 'OTU ' + element;
    });
    console.log("otuIds940SlicedLabels: ", otuIds940SlicedLabels);

    // Sort the array in descending order    
  //  var sampleValues940SlicedSorted = sampleValues940Sliced.sort(function compareFunction(firstNum, secondNum) {
      // resulting order is (3, 2, 1)
  //    return secondNum - firstNum;
  //  });

  //  console.log("sampleValues940SlicedSorted: ", sampleValues940SlicedSorted);

    // Reverse the array to accommodate Plotly's defaults
    reversedSampleValues940Sliced = sampleValues940Sliced.reverse();
    reversedOtuIds940SlicedLabels = otuIds940SlicedLabels.reverse();


    var trace1 = {
      x: reversedSampleValues940Sliced,
      y: otuIds940SlicedLabels,
  //    text: otuLabels940Sliced,
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
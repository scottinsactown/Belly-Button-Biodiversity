// test link
console.log("js linked")

// // test location of data
// d3.json("data/samples.json").then(function(data) {
//     let dataset = data.samples; 
//     let values = dataset.sample_values; 
//     let names = data.names;
//     let demos = data.metadata;
//     let sample_values = dataset.map(row=> row.sample_values);
//     let otu_ids = dataset.map(row=>row.otu_ids);
//     let otu_names = dataset.map(row=>row.otu_labels); 
//     console.log(dataset);
//     console.log(values);
//     console.log(names)
//     console.log(demos)
//     console.log(sample_values);
//     console.log(otu_ids);
//     console.log(otu_names);
// });

// Initializes the page with a default plot
function init() {
    d3.json("data/samples.json").then(function(data) {
    data.names.forEach(id_no => {
        d3.select("#selDataset").append("option").text(id_no).property("value");
        })
    })
};
    // data = [{
    //   x: [1, 2, 3, 4, 5],
    //   y: [1, 2, 4, 8, 16] }];
    // var CHART = d3.selectAll("#plot").node();
    // Plotly.newPlot(CHART, data);

// Add event listener for submit button - turnon when fillPage ready
// d3.select("#selDataset").on("click", fillPage);

init(); // needs to be at end?


// // Submit Button handler
// function handleSubmit() {
//     // Prevent the page from refreshing
//     // d3.event.preventDefault(); //need????
//     // Select the input value from the form
//     let subject = d3.select("#selDataset").node().value;
//     console.log(subject);
//     // clear the input value
//     // d3.select("#stockInput").node().value = "";
//     // Build the plot with the new subject
//     buildPlots(subject);
// }

// // Pull metadata

// function buildPlots(subject) {
//     d3.json("data/samples.json").then(function(data) {
//         let dataset = data.samples; 
//         let names = data.names;
//         let demos = data.metadata; // map with this? var dates = data.dataset.data.map(row => row[0]);
//         let sample_values = dataset.map(row=> row.sample_values);
//         let otu_ids = dataset.map(row=>row.otu_ids);
//         let otu_names = dataset.map(row=>row.otu_labels); 

//         let trace1 = {
//         x: sample_values
//         y: otu_ids
//         // text: data.map(row => row.samples[4]),
//         name: "Test",
//         type: "bar",
//         orientation: "h"
//       };

//       let chartData = [trace1];

//       let layout = {
//         title: "Test search results",
//         margin: {
//           l: 100,
//           r: 100,
//           t: 100,
//           b: 100
//         }
//         // xaxis:
//         // yaxis:
//       };    
//       Plotly.newPlot("bar", chartData, layout); //or restyle?
//     });

//     }

// 1. Use the D3 library to read in `samples.json`. There is a samples section for each x153
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// SORT/SLICE
// * Use samples:`sample_values` as the values for the bar chart.
// * Use samples:`otu_ids` as the labels for the bar chart.
// * Use samples"`otu_labels` as the hovertext for the chart.
//   ![bar Chart](Images/hw01.png)
// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.
// ![Bubble Chart](Images/bubble_chart.png)
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// ![hw](Images/hw03.png)
// 6. Update all of the plots any time that a new sample is selected.
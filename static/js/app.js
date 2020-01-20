// confirm linked
console.log("js linked")

// // json data paths for reference
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

// Initializes the page with a default plot ***** still needed
function init() {
    d3.json("data/samples.json").then(function(data) {
    data.names.forEach(id_no => {
        d3.select("#selDataset").append("option").text(id_no).property("value"); // or node version
        })
    })
};

// Event listener for dropdown seletion - need generic fill page as well
d3.select("#selDataset").on("change", fillPage); 

function fillPage() {
    console.log("fillPage!");
    // Prevent the page from refreshing //need????
    // d3.event.preventDefault(); //need????
    // Select the input value from the form
    let subject = d3.select("#selDataset").node().value; // or property version
    console.log(subject);
    // clear the input value //need????
    // d3.select("#stockInput").node().value = ""; //need????
    // Build the plot with the new subject
    buildPlots(subject);
}

function buildPlots(subject) { //how incorporate subject? 
    console.log("buildPlots!")
    console.log(subject)

    // bar chart
    d3.json("data/samples.json").then(function(data) {
    let dataset = data.samples; 
    let sample_values = dataset.map(row=> row.sample_values)
    let otu_ids = dataset.map(row=>row.otu_ids);

    let trace1 = {
        x: sample_values,
        y: otu_ids,
        // text: data.map(row => row.samples[4]),
        name: "Test",
        type: "bar",
        orientation: "h"
    };

    let chartData = [trace1];

    let layout = {
            title: "Test search results",
            // margin: {
            //     l: 100,
            //     r: 100,
            //     t: 100,
            //     b: 100
            // }
            // xaxis:
            // yaxis:
            };    

    Plotly.newPlot("bar", chartData, layout); //or restyle?

        })

    
};
    

    //   let chartData = [trace1];

    //   let layout = {
    //     title: "Test search results",
    //     margin: {
    //       l: 100,
    //       r: 100,
    //       t: 100,
    //       b: 100
    //     }
    //     // xaxis:
    //     // yaxis:
    //   };    
    //   Plotly.newPlot("bar", chartData, layout); //or restyle?


init(); // needs to be at end?




// // Pull metadata



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
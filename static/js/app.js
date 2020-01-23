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

// Event listener for dropdown seletion - need init and update seperate, this should trigger update
d3.select("#selDataset").on("change", updatePage); // seperate out functions for init vs update

function updatePage() {
    console.log("updatePage!");

    let subject = d3.select("#selDataset").node().value; // or property version
    console.log(subject);

// call fillCharts function seperately?

    // bar chart
    d3.json("data/samples.json").then(function(data) {
        
        filteredData = data.samples.filter(function(datapoint) {
            return datapoint.id === subject;
        });

        let sample_values = filteredData[0].sample_values.slice(0,10).reverse();
        let otu_ids = filteredData[0].otu_ids.map(id => ("OTU " + id)).slice(0,10).reverse();
        let otu_labels = filteredData[0].otu_labels.slice(0,10).reverse();

        let traceBar = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            name: "Test",
            type: "bar",
            orientation: "h"
        };
    
        let barData = [traceBar];
    
        let layout = {
                title: "Test search results",
                // margin: {
                //     l: 100,
                //     r: 100,
                //     t: 100,
                //     b: 100
                // },
                xaxis: {label: "sample_values"},
                yaxis: {label: "otu_ids"}
                };    
    
        Plotly.newPlot("bar", barData, layout); //or restyle?
        // fix tooltips
            })

    // bubble chart
    d3.json("data/samples.json").then(function(data) {
        filteredData = data.samples.filter(function(datapoint) {
            return datapoint.id === subject;
        });
            let sample_values = filteredData[0].sample_values
            let otu_ids = filteredData[0].otu_ids
            let otu_labels = filteredData[0].otu_labels

            let traceBubble = {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                // opacity
                marker: {
                    size: sample_values,
                    color: otu_ids,
                }
            }

            let bubbleData = [traceBubble];

            let layout = {
                title: "Test search results",
                margin: {
                    l: 50,
                    r: 50,
                    t: 50,
                    b: 50
                },
                xaxis: {label: "OTU IDs"},
                yaxis: {label: "Sample values"}
                };   

            Plotly.newPlot("bubble", bubbleData,layout);

        });

    // data table
    d3.json("data/samples.json").then(function(data) {
        filteredData = data.metadata.filter(function(datapoint) {
            return datapoint.id.toString() === subject;
        })[0];
        console.log(filteredData)
            let table = d3.select("#sample-metadata");
            table.html("");
            Object.entries(filteredData).forEach(function(key) {
                table.append('tr').text(key[0] + ": " + key[1] + "\n");
            })
        ;
        });

}
    


init(); // needs to be at end?


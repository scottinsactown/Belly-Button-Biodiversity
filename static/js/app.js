// *** Belly Botton Biodiversity 

// Initializes the page - fills dropdown with subjects IDs and displays default subject
function init() {
    d3.json("data/samples.json").then(function(data) {
    
    // skips 940 because as default already in html
    data.names.forEach(id_no => {
        if (id_no !== "940") {
        d3.select("#selDataset").append("option").text(id_no).property("value"); // or node version
        }});
    })
    updatePage();
};

// Event listener for dropdown seletion 
d3.select("#selDataset").on("click", updatePage); 

// Update data based on dropdown selection
function updatePage() {
    console.log("updating page");
    let subject = d3.select("#selDataset").node().value; // or property version
 
    // bar chart
    d3.json("data/samples.json").then(function(data) {
     
        filteredData = data.samples.filter(function(datapoint) {
            return datapoint.id === subject;
        });

        let sample_values = filteredData[0].sample_values.slice(0,10).reverse();
        let otu_ids = filteredData[0].otu_ids.map(id => ("OTU " + id)).slice(0,10).reverse();
        let otu_labels = filteredData[0].otu_labels.map(item => item.replace(/;/g,"<br>")).slice(0,10).reverse();

        let traceBar = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        let barData = [traceBar];

        let layout = {
            title: `Top 10 OTUs Found<br>in Subject ${subject}`,
                margin: {
                    l: 100,
                },
            xaxis: {title: "Number Found"},
            // yaxis: {title: "otu_ids"}
            };    
    
        Plotly.newPlot("bar", barData, layout); //or restyle?
        // fix tooltips
            })

    // bubble chart
    d3.json("data/samples.json").then(function(data) {
        filteredData = data.samples.filter(function(datapoint) {
            return datapoint.id === subject;
        });
            let sample_values = filteredData[0].sample_values;
            let otu_ids = filteredData[0].otu_ids;
            let otu_labels = filteredData[0].otu_labels.map(item => item.replace(/;/g,"<br>"))

            let traceBubble = {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                // opacity
                marker: {
                    size: sample_values,
                    color: otu_ids,
                },
            };

            let bubbleData = [traceBubble];

            let layout = {
                title: `<br>All OTUs Found in Subject ${subject}`,
                margin: {
                    l: 115,
                    r: 50,
                    t: 50,
                    b: 100
                },
                xaxis: {title: "OTU IDs"},
                yaxis: {title: {
                    text: "Number<br>Found",
                    standoff: 20},
                    automargin: true
                }
            };   

            Plotly.newPlot("bubble", bubbleData,layout);

        });

    // data table
    d3.json("data/samples.json").then(function(data) {
        filteredData = data.metadata.filter(function(datapoint) {
            return datapoint.id.toString() === subject;
        })[0];
        console.log(filteredData);
            let table = d3.select("#sample-metadata");
            table.html("");
            Object.entries(filteredData).forEach(function(key) {
                table.append('tr').text((key[0]).toUpperCase() + ": " + key[1] + "\n");
            });
        });
};
    
init(); // needs to be at end?


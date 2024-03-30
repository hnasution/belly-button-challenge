// store constant variable named url to store string value of the URL
// 
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

//Use D3 to fetch the JSON data and then logs the data to console
d3.json(url).then(function(data){
    console.log(data);
}); 

//create init function that will populate the dropdown, bar chart, and bubble chart with each sample's dataset
function init(){

    // search for element with the ID "selDataset" and assign a reference to
    // that element to the 'dropdown' varable 
    let dropdown = d3.select("#selDataset");

    // user d3 to access sample data
    d3.json(url).then((data) => {

        // Extract names list and store in variable 
        let sample_ids = data.names;

        //Debug console log
        console.log(sample_ids);

        //Append each ID as a new value to the dropdown list
        for (id of sample_ids){
            dropdown.append("option").attr("value", id).text(id);
        };

        //Extract the first entry fom the array and assigns to a new variable named 'first_entry for display initialisation
        let first_entry = sample_ids[0];
        //Debug console log
        console.log(first_entry);
    
        //Call the graph functions with the first entry (id 940)
        createBar(first_entry);
        createBubble(first_entry);
        createDemographics(first_entry);
        createGauge(first_entry);

    });
};

//Declare Horizontal bar chart function
function createBar(sample){

    // use d3 to access sample data to populate bar chart
    d3.json(url).then((data) => {
        
        //Extract samples array from data
        let sample_data = data.samples;

        //Apply filter array based on sample id
        let results = sample_data.filter(id => id.id == sample);

        //Access and store first entry in filtered results
        let first_result = results[0];
        console.log(first_result);

        //Extract and store first 10 elements
        let sample_values = first_result.sample_values.slice(0,10);
        let otu_ids = first_result.otu_ids.slice(0,10);
        let otu_labels = first_result.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //Define the trace for bar chart
        let bar_trace = {
            x: sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${item}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        //Add chart title and plot
        let layout = {title: "Top Ten OTUs"};
        Plotly.newPlot("bar", [bar_trace], layout);
    });
};

//Declare Bubble chart function
function createBubble(sample){

    //Access sample data with d3 to populate bubble chart
    d3.json(url).then((data) => {

        //Extract samples array from data
        let sample_data = data.samples;

        //Filter through array based on sample id
        let results = sample_data.filter(id => id.id == sample);
        
        // access and stroe first entry in filtered result
        let first_result = results[0];
        console.log(first_result);

        //Extract and store data from first entry object
        let sample_values = first_result.sample_values;
        let otu_ids = first_result.otu_ids;
        let otu_labels = first_result.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //Define the trace for bubble chart
        let bubble_trace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_labels.reverse(),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        //Add chart and axis titles and plot
        let layout = {
            title: "Bacteria Count for each Sample ID",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Number of Bacteria'}
        };
        Plotly.newPlot("bubble", [bubble_trace], layout);
    });
};

//create the demographic info function to populate each samples
function createDemographics(sample){

    //use d3 to access metadata to populate demographics section
    d3.json(url).then((data) => {

        //extracts the demographic information 
        let demographic_info = data.metadata;

        //Filter through array based on sample id
        let results = demographic_info.filter(id => id.id == sample);

        //Access first entry to display in demographic info
        let first_result = results[0];
        console.log(first_result);

        //Clear out previous entries in demographic info section 
        //by setting the text to a blank string
        d3.select('#sample-metadata').text('');

        
        Object.entries(first_result).forEach(([key,value]) => {
            console.log(key,value);

            //select the demographic info html section with d3 and append new key-value pair
            d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
        });
    
    });
};

// Declare Gauge Function
function createGauge(id) {
    d3.json(url).then(function (data) {
        let sampleData = data;
        let metadata = sampleData.metadata;
        let identifier = metadata.filter(sample =>
            sample.id.toString() === id)[0];
        let panel = d3.select('#sample-metadata');
        panel.html('');
        Object.entries(identifier).forEach(([key, value]) => {
            panel.append('h6').text(`${key}: ${value}`);
        })
        let gaugeTrace = {
            domain: { x: [0, 5], y: [0, 1] },
            // value: identifier.wfreq,
            type: "indicator",
            ids: ['0-1', '1-2', '2-3', '3-4', '5-6', '6-7', '7-8', '8-9'],
            gauge: {
                axis: {
                    range: [0, 9],
                    tickmode: 'linear'
                },
                steps: [
                    { range: [0, 1], color: 'rgb(248,243,236)', id: '0-1' },
                    { range: [1, 2], color: 'rgb(244,241,228)', name: '1-2' },
                    { range: [2, 3], color: 'rgb(233,230,201)', name: '2-3' },
                    { range: [3, 4], color: 'rgb(229,232,176)', name: '3-4' },
                    { range: [4, 5], color: 'rgb(213,229,153)', name: '4-5' },
                    { range: [5, 6], color: 'rgb(183,205,143)', name: '5-6' },
                    { range: [6, 7], color: 'rgb(138,192,134)', name: '6-7' },
                    { range: [7, 8], color: 'rgb(137,188,141)', name: '7-8' },
                    { range: [8, 9], color: 'rgb(132,181,137)', name: '8-9' },
                ]
            },
            mode: "gauge"
        };
        let deg = (180 / 9) * identifier.wfreq;
        let radius = 0.5;
        let radians = (deg * Math.PI) / 180;
        let x = -1 * radius * Math.cos(radians);
        let y = radius * Math.sin(radians);
        let guageLayout = {
            title: "<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week</br>",
            shapes: [{
                type: 'line',
                x0: 0.5,
                y0: 0,
                x1: x + 0.5,
                y1: y + 0.5,
                line: {
                    color: 'red',
                    width: 4
                }
            }],
            xaxis: { visible: true, range: [-1, 1] },
            yaxis: { visible: true, range: [-1, 1] },
            width: 800,
            height: 500

        };
        
        let gaugeData = [gaugeTrace];
        Plotly.newPlot('gauge', gaugeData, guageLayout);
    })
}


//define the function when the dropdown detects a change (function name as defined in index.html)
function optionChanged(value){

    //Debug
    console.log(value);

    createBar(value);
    createBubble(value);
    createDemographics(value);
    createGauge(value);
};

//Application initialise
init();

function infodemochart(sample) {   
    d3.json('data/samples.json')
    .then((data) => {
    var metadata = data.metadata;
    var filteredArray = metadata.filter(sampleData => sampleData.id == sample);
    // console.log(filteredArray);
    var filteredData = filteredArray[0];

    var panel = d3.select("#sample-metadata");

    panel.html("");

    Object.entries(filteredData).forEach(([key,val]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${val}`);
    });
});
}

function bellybuttoncharts(sample){

    d3.json('data/samples.json')
    .then((data) => {
    var samples = data.samples;
    var filteredArray = samples.filter(sampleData => sampleData.id == sample);
    var filteredData = filteredArray[0];

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    var hbar = {
        type: 'bar',
        x: filteredData.sample_values.slice(0,10).reverse(),
        y: filteredData.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        orientation: 'h',
        text: filteredData.otu_labels.slice(0,10).reverse()
       
      };
    
    var bardata = [hbar];
    
    var barlayout = {
        title: `Top 10 OTU`                       
        };
    
    Plotly.newPlot('bar', bardata, barlayout);
 
//Create a bubble chart that displays each sample.

    //Use otu_labels as the hovertext for the chart.

//https://plotly.com/javascript/hover-text-and-formatting/

//https://plotly.com/javascript/bubble-charts/

    var trace1 = {
        x: filteredData.sample_values,
        y: filteredData.otu_ids,
        text: filteredData.otu_labels,
        mode: 'markers',
        marker: {
          color: filteredData.otu_ids,
          size: filteredData.sample_values,
        }
      };
      
      var bubbledata = [trace1];
      
      var bubblelayout = {
        title: `Sample Belly Button Biodiversity`,
        showlegend: false,
        hovermode: "closest",
        xaxis: {title:"OTU ID"},
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', bubbledata, bubblelayout);

    });
}

function init(){

    var dropdownMenu = d3.select("#selDataset");

    d3.json('data/samples.json')
    .then((data) => {
        var dropdownNames = data.names;
        dropdownNames.forEach((sample) => {
          dropdownMenu.append('option')
            .text(sample)
            .property("value", sample);
        });
    
    var showID = dropdownNames[0];
    infodemochart(showID);
    bellybuttoncharts(showID);
});
}
   
   
function optionChanged(othersample) {
    infodemochart(othersample);
    bellybuttoncharts(othersample);
//}
   
}

init();

//Display the sample metadata, i.e., an individual's demographic information.


//Display each key-value pair from the metadata JSON object somewhere on the page.


//Update all of the plots any time that a new sample is selected.
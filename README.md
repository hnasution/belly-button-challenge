# Module 14 Interactive Visualisation 

## belly-button-challenge

### Background
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset (http://robdunnlab.com/projects/belly-button-biodiversity/) , which catalogues the microbes that colonise human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in
the study) were present in more than 70% of people, while the rest were relatively rare.


### Data sources:

https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

### Instructions
Complete the following steps:
1. Use the D3 library to read in  samples.json  from the Data sources.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
* Use  sample_values  as the values for the bar chart.
* Use  otu_ids  as the labels for the bar chart.
* Use  otu_labels  as the hovertext for the chart.

3. Create a bubble chart that displays each sample.
* Use  otu_ids  for the x values.
* Use  sample_values  for the y values.
* Use  sample_values  for the marker size.
* Use  otu_ids  for the marker colors.
* Use  otu_labels  for the text values.

4. Display the sample metadata, i.e., an individual's demographic information.
5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all the plots when a new sample is selected. 

Answers to all the questions above can be found here on [GitHub Page](https://hnasution.github.io/belly-button-challenge/).








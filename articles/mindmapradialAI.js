var treeData = {
  name: "Machine Learning",
  description: "Overview of Machine Learning techniques and methods",
  children: [
    {
      name: "Supervised",
      description: "Learning with labeled data to make predictions",
      children: [
        {
          name: "Regression",
          description: "Predict continuous numerical values",
          children: [
            { name: "Linear Regression", description: "Models relationship between variables linearly" }
          ]
        },
        {
          name: "Classification",
          description: "Predict discrete class labels",
          children: [
            { name: "Logistic Regression", description: "Models binary outcome probabilities" },
            { name: "Support Vector Machines (SVM)", description: "Finds optimal separating hyperplane" },
            { name: "Decision Tree", description: "Models decisions with a tree structure" },
            { name: "Random Forest", description: "Ensemble of decision trees for improved accuracy" },
            { name: "XGBoost", description: "Scalable and effective gradient boosting framework" }
          ]
        }
      ]
    },
    {
      name: "Semi Supervised",
      description: "Learning with a mix of labeled and unlabeled data",
      children: [
        { name: "Active Learning", description: "Algorithm queries user for labels on new data points" },
        { name: "Reinforcement Learning", description: "Learning optimal actions through trial and error" },
        { name: "Online Learning", description: "Learning from data arriving in a sequential order" },
        { name: "Transfer Learning", description: "Leveraging knowledge from a source task to a target task" },
        { name: "Adversarial Learning", description: "Training models in the presence of adversarial examples" }
      ]
    },
    {
      name: "Unsupervised",
      description: "Learning patterns from unlabeled data",
      children: [
        { name: "KMeans", description: "Partitions data into k clusters based on distance" },
        { name: "Principal Component Analysis", description: "Finds principal components to reduce dimensionality" }
      ]
    }
  ]
};


// Set dimensions and radius
var width = 960,
    height = 960,
    radius = Math.min(width, height) / 2 - 120;  // margin for labels

// Create SVG container and center group
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Create radial tree layout
var treemap = d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

// Create hierarchy from data
var root = d3.hierarchy(treeData);

var i = 0;

// Tooltip div (hidden initially)
var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("text-align", "center")
  .style("width", "180px")
  .style("padding", "8px")
  .style("font", "12px sans-serif")
  .style("background", "lightsteelblue")
  .style("border", "0px")
  .style("border-radius", "8px")
  .style("pointer-events", "none")
  .style("opacity", 0);

update(root);

function update(source) {
  var treeData = treemap(root);

  var nodes = treeData.descendants(),
      links = treeData.links();

  // Converts from polar to cartesian coordinates
  function project(x, y) {
    return [y * Math.cos(x - Math.PI / 2), y * Math.sin(x - Math.PI / 2)];
  }

  // LINKS
  var link = svg.selectAll("path.link")
      .data(links, d => d.target.id);

  link.enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1.5)
    .merge(link)
    .attr("d", d => {
      var start = project(d.source.x, d.source.y);
      var end = project(d.target.x, d.target.y);
      return `M${start[0]},${start[1]}L${end[0]},${end[1]}`;
    });

  link.exit().remove();

  // NODES
  var node = svg.selectAll("g.node")
      .data(nodes, d => d.id || (d.id = ++i));

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", d => {
        var coords = project(d.x, d.y);
        return `translate(${coords[0]},${coords[1]})`;
      })
      .on("mouseover", function(event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`<strong>${d.data.name}</strong><br/>${d.data.description || ""}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mousemove", function(event) {
        tooltip.style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

  nodeEnter.append("circle")
      .attr("r", 6)
      .style("fill", "#fff")
      .style("stroke", "steelblue")
      .style("stroke-width", "1.5px")
      .attr("cursor", "pointer");

  nodeEnter.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI ? 10 : -10)
      .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
      .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
      .text(d => d.data.name)
      .style("font", "12px sans-serif")
      .style("user-select", "none");

  node.exit().remove();
}

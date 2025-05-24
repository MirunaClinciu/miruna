var treeData = {
  name: "Machine Learning",
  description: "Overview of Machine Learning techniques and methods",
  children: [
    {
      name: "Supervised Learning",
      description: "Learning with labeled data to make predictions, where the model learns from input-output pairs.",
      children: [
        {
          name: "Classification",
          description: "Predicting discrete class labels or categories.",
          children: [
            { name: "Logistic Regression", description: "A linear model for binary classification, predicting the probability of an instance belonging to a particular class." },
            { name: "Support Vector Machines (SVM)", description: "Finds an optimal hyperplane that separates data points of different classes with the largest margin." }
          ]
        },
        {
          name: "Regression (Parametric)",
          description: "Predicting continuous numerical values using models with a fixed number of parameters.",
          children: [
            { name: "OLS (Ordinary Least Squares)", description: "A method to estimate the unknown parameters in a linear regression model by minimizing the sum of the squares of the differences between the observed and predicted values." },
            { name: "MARS (Multivariate Adaptive Regression Splines)", description: "A non-parametric regression technique that builds a model by fitting piecewise linear basis functions to data." },
            { name: "PCR (Principal Component Regression)", description: "A regression technique that uses principal components to reduce multicollinearity and improve model stability." },
            { name: "Ridge Regression", description: "A regularization technique that adds a penalty to the loss function to prevent overfitting in linear regression models." },
            { name: "Discriminant Analysis", description: "A statistical method used to find a linear combination of features that characterizes or separates two or more classes of objects or events." }
          ]
        },
        {
          name: "Instance-based (Non-parametric)",
          description: "Models that make predictions based on similarity to training instances, without forming an explicit model.",
          children: [
            { name: "Gaussian Process", description: "A non-parametric, probabilistic model that defines a distribution over functions and can be used for regression and classification." },
            {
              name: "Tree-based Methods",
              description: "Models that partition the feature space into a set of rectangles and fit a simple model (like a constant) in each rectangle.",
              children: [
                { name: "Decision Trees", description: "A flowchart-like structure where each internal node represents a test on an attribute, each branch represents an outcome of the test, and each leaf node represents a class label." },
                { name: "Random Forest", description: "An ensemble learning method that constructs a multitude of decision trees at training time and outputs the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees." }
              ]
            }
          ]
        },
        {
          name: "Dimensionality Reduction (Supervised Context)",
          description: "Reducing the number of features while retaining important information, often used for visualization or to improve model performance. In a supervised context, it might consider class labels.",
          children: [
            { name: "Latent Variable Models", description: "Models that describe observed data in terms of a set of unobserved (latent) variables, often used for dimensionality reduction." },
            { name: "Sparse Coding", description: "A technique that represents data as a sparse linear combination of basis vectors, promoting sparsity in the representation." },
            { name: "Matrix Completion", description: "The task of filling in missing entries of a matrix, often by exploiting underlying low-rank structure." },
            { name: "Polynomial Chaos", description: "A method for representing stochastic processes or random variables using an orthogonal polynomial basis, often used in uncertainty quantification and model reduction." }
          ]
        },
        {
          name: "Generative (Density Estimation)",
          description: "Models that learn the underlying distribution of the data to generate new samples or estimate the probability density function.",
          children: [
            { name: "Bayesian Methods", description: "Statistical inference methods that use Bayes' theorem to update the probability for a hypothesis as more evidence or information becomes available." },
            { name: "MCMC (Markov Chain Monte Carlo)", description: "A class of algorithms for sampling from a probability distribution by constructing a Markov chain that has the desired distribution as its stationary distribution." }
          ]
        },
        {
          name: "Discriminative",
          description: "Models that directly learn a mapping from input features to output labels, without explicitly modeling the underlying data distribution.",
          children: [
            {
              name: "Neural Networks",
              description: "Computational models inspired by the structure and function of biological neural networks, consisting of interconnected nodes (neurons) organized in layers.",
              children: [
                { name: "Deep Neural Networks", description: "Neural networks with multiple hidden layers, capable of learning complex representations of data." },
                { name: "Convolutional Neural Networks (CNNs)", description: "Specialized neural networks designed for processing grid-like data such as images, using convolutional layers to extract features." },
                { name: "Recurrent Neural Networks (RNNs)", description: "Neural networks designed for sequential data, where connections between nodes form a directed graph along a temporal sequence, allowing them to exhibit temporal dynamic behavior." }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Unsupervised Learning",
      description: "Learning from unlabeled data to find hidden patterns, structures, or relationships within the data.",
      children: [
        {
          name: "Clustering",
          description: "The task of grouping a set of objects in such a way that objects in the same group (called a cluster) are more similar to each other than to those in other groups.",
          children: [
            { name: "K-means", description: "An iterative algorithm that partitions 'n' observations into 'k' clusters in which each observation belongs to the cluster with the nearest mean (cluster centroids)." }
          ]
        },
        {
          name: "Dimensionality Reduction",
          description: "The process of reducing the number of random variables under consideration by obtaining a set of principal variables.",
          children: [
            { name: "PCA (Principal Component Analysis)", description: "A statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of linearly uncorrelated variables called principal components." }
          ]
        },
        {
          name: "Kernel Methods",
          description: "A class of algorithms for pattern analysis, whose best-known member is the support vector machine (SVM). These methods rely on kernel functions to map data into a higher-dimensional feature space where they might be linearly separable."
          // Specific kernel methods (e.g., RBF kernel, polynomial kernel) could be added here if desired.
        },
        {
          name: "Density Estimation",
          description: "The process of constructing an estimate of the probability density function from observed data. This can be used for anomaly detection, data generation, or understanding data distribution."
          // Specific density estimation methods (e.g., Kernel Density Estimation, Gaussian Mixture Models) could be added here.
        }
      ]
    },
    {
      name: "Semi Supervised Learning",
      description: "Learning that uses both labeled and unlabeled data, often when labeled data is scarce or expensive to obtain.",
      children: [
        { name: "Active Learning", description: "A method where the learning algorithm interactively queries a user or some other information source to label new data points with the desired outputs." },
        { name: "Online Learning", description: "A method of machine learning where data becomes available in a sequential order, and the model is updated iteratively after each new data point or small batch of data." },
        { name: "Transfer Learning", description: "A machine learning method where a model developed for a task is reused as the starting point for a model on a second task." },
        { name: "Adversarial Learning", description: "A technique that involves training a model to be robust against adversarial examples, often using generative adversarial networks (GANs)." }
      ]
    },
    {
      name: "Reinforcement Learning",
      description: "In reinforcement learning, an agent learns from a series of reinforcements: rewards and punishments, by interacting with an environment to achieve a goal.",
      // You can add children here if there are specific sub-types of Reinforcement Learning you want to include.
      children: [
        { name: "Q-Learning", description: "A model-free reinforcement learning algorithm to learn a policy telling an agent what action to take under what circumstances." },
        { name: "SARSA", description: "State-Action-Reward-State-Action, an on-policy reinforcement learning algorithm for learning a Markov decision process policy." }
      ]
    }
  ]
};


var margin = {top: 40, right: 250, bottom: 30, left: 150},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    // Center horizontally by translating group by half the width + margin.left
    .attr("transform", "translate(" + ((width / 2) + margin.left) + "," + margin.top + ")");

svg.append("text")
    .attr("class", "mindmap-title")
    .attr("x", 0) // Center the title
    .attr("y", -margin.top+20) // Position above the tree
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .text("Horizontal Mind Map"); 
var i = 0,
    duration = 750,
    root;

var treemap = d3.tree().size([height, width]);

root = d3.hierarchy(treeData, d => d.children);
root.x0 = height / 2;
root.y0 = 0;

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
      links = treeData.descendants().slice(1);

  // In your vertical tree, x is vertical (0 to height), y is horizontal (0 to width)
  // To center horizontally, shift nodes by half width minus max node y position / 2

  // Find max y to help horizontal centering
  var maxY = d3.max(nodes, d => d.y);

  // Adjust y positions so the whole tree is horizontally centered
  nodes.forEach(d => {
    d.y = d.y - maxY / 2;
  });

  
  // Nodes section
  var node = svg.selectAll('g.node')
      .data(nodes, d => d.id || (d.id = ++i));

  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", d => `translate(${source.y0},${source.x0})`);

  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", "#fff")
      .on("mouseover", function(event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html("<strong>" + d.data.name + "</strong><br/>" + d.data.description)
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

  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", d => d.children || d._children ? -13 : 13)
      .attr("text-anchor", d => d.children || d._children ? "end" : "start")
      .text(d => d.data.name);

  var nodeUpdate = nodeEnter.merge(node);

  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", d => `translate(${d.y},${d.x})`);

  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", "#fff")
    .attr('cursor', 'pointer');

  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .remove();

  nodeExit.select('circle')
    .attr('r', 1e-6);

  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // Links section
  var link = svg.selectAll('path.link')
      .data(links, d => d.id);

  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', d => {
        var o = {x: source.x0, y: source.y0};
        return diagonal(o, o);
      });

  var linkUpdate = linkEnter.merge(link);

  linkUpdate.transition()
      .duration(duration)
      .attr('d', d => diagonal(d, d.parent));

  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', d => {
        var o = {x: source.x, y: source.y};
        return diagonal(o, o);
      })
      .remove();

  nodes.forEach(d => {
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Curved path from parent to child
  function diagonal(s, d) {
    return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
  }
}

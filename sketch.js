let statBestPhrase;
let statMutationRate;
let statPopulation;
let statAllPhrases;
let statAvgFitness;
let statGeneration;

let target;
let mutationRate;
let maxPopulation;

let population;

function setup() {
  target = "Genetic Algorithm for the infinite monkey theorem.";
  mutationRate = 0.00075;
  maxPopulation = 256;

  population = new Population(target, mutationRate, maxPopulation);

  statBestPhrase = createDiv("");
  statBestPhrase.style("font-size", 50);
  statBestPhrase.position(100, window.innerHeight / 2);

  statMutationRate = createDiv("mutation rate: " + mutationRate * 100 + "%");
  statMutationRate.style("font-size", 20);
  statMutationRate.position(100, 100);

  statPopulation = createDiv("population: " + maxPopulation);
  statPopulation.style("font-size", 20);
  statPopulation.position(100, 120);

  statAvgFitness = createDiv();
  statAvgFitness.style("font-size", 20);
  statAvgFitness.position(100, 140);

  statGeneration = createDiv();
  statGeneration.style("font-size", 20);
  statGeneration.position(100, 160);

  statAllPhrases = createDiv();
  statAllPhrases.style("font-size", 10);
  statAllPhrases.position((window.innerWidth / 4) * 3, 100);
}

function draw() {
  population.naturalSelection();

  population.reproduce();

  population.calcFitness();

  population.evaluate();

  if (population.finished) noLoop();

  displayInfo();
}

function displayInfo() {
  statBestPhrase.html(population.getBest());
  statAvgFitness.html("average fitness: " + population.getAvgFitness());
  statGeneration.html("generation: " + population.generation);

  statAllPhrases.html(population.getAllPhrases());
}

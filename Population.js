class Population {
  constructor(target, mutationRate, maxPopulation) {
    this.target = target;
    this.mutationRate = mutationRate;
    this.maxPopulation = maxPopulation;
    this.generation = 0;
    this.bestPhrase = "";
    this.finished = false;

    this.population = [];
    for (let i = 0; i < maxPopulation; i++) {
      this.population[i] = new Cromossome(this.target.length);
    }

    this.matingPool = [];
  }

  getBest() {
    let bestFitness = 0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > bestFitness) {
        bestFitness = this.population[i].fitness;
        index = i;
      }
    }

    return this.population[index].getGene();
  }

  getAvgFitness() {
    let fitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      fitness += this.population[i].fitness;
    }

    return fitness / this.maxPopulation;
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  naturalSelection() {
    this.matingPool = [];
    this.population.forEach((individual) => {
      let factor =
        individual.fitness === 0 ? 1 : floor(individual.fitness * 100);

      for (let i = 0; i < factor; i++) {
        this.matingPool.push(individual);
      }
    });
  }

  reproduce() {
    for (let i = 0; i < this.maxPopulation; i++) {
      let parentA = this.matingPool[floor(random(0, this.matingPool.length))];
      let parentB = this.matingPool[floor(random(0, this.matingPool.length))];

      let child = Cromossome.crossOver(parentA, parentB, this.target.length);

      child.mutate(this.mutationRate);

      this.population[i] = child;
    }
    this.generation++;
  }

  evaluate() {
    let max = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > max) {
        index = i;
        max = this.population[i].fitness;
      }
    }

    this.bestPhrase = this.population[index].getGene();
    if (max === 1) {
      this.finished = true;
    }
  }

  getAllPhrases() {
    let allPhrases = "";

    let displayLimit = min(this.population.length, 50);

    for (let i = 0; i < displayLimit; i++) {
      allPhrases += this.population[i].getGene() + "<br />";
    }
    return allPhrases;
  }
}

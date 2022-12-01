class Cromossome {
  constructor(size) {
    this.size = size;
    this.gene = [];
    this.fitness = 0;

    for (let i = 0; i < size; i++) {
      this.gene.push(this.generateChar());
    }
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.gene.length; i++) {
      if (this.gene[i] == target[i]) score++;
    }

    this.fitness = score / target.length;
  }

  generateChar() {
    let rand = random(32, 126);

    return String.fromCharCode(rand);
  }

  getGene() {
    return this.gene.join("");
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.gene.length; i++) {
      if (random(1) < mutationRate) this.gene[i] = this.generateChar();
    }
  }

  static crossOver(parentA, parentB, size) {
    let mid = random(size);
    let child = new Cromossome(size);

    for (let i = 0; i < size; i++) {
      if (i < mid) child.gene[i] = parentA.gene[i];
      else child.gene[i] = parentB.gene[i];
    }

    return child;
  }
}

/**
 * WordsList est une classe TypeScript qui gère la liste des mots et les associations correctes pour le contrôle de glisser-déposer.
 * Cette classe fournit des méthodes pour vérifier si les mots sont du même côté, pour obtenir les mots associés corrects,
 * et pour gérer l'état des mots suivis lors du glisser-déposer.
 *
 * Méthodes principales :
 * - checkIfWordsSameSide: Vérifie si les mots suivis sont du même côté.
 * - getCorrectAssociations: Retourne un boolean si l'association est correcte.
 * - getWords: permet de récuper la liste de mot a droite ou a gauche ("left" | "right").
 */
export class ElementsList {
  private _elements: { type: 'text' | 'image'; value: string }[][];
  private _elementsLeft: { type: 'text' | 'image'; value: string }[];
  private _elementsRight: { type: 'text' | 'image'; value: string }[];

  constructor(elements: string[][]) {
    this._elements = elements.map((pair) =>
      pair.map((item) => this.parseElement(item)),
    );
    this._elementsLeft = this._elements
      .map((e) => e[0])
      .sort(() => Math.random() - 0.5);
    this._elementsRight = this._elements
      .map((e) => e[1])
      .sort(() => Math.random() - 0.5);
  }

  private parseElement(item: string): {
    type: 'text' | 'image';
    value: string;
  } {
    if (
      item.startsWith('data:image/') ||
      item.startsWith('http://') ||
      item.startsWith('https://')
    ) {
      return { type: 'image', value: item };
    }
    return { type: 'text', value: item };
  }

  public checkIfCorrectAssociation(elementsTracked: {
    elementInit: string;
    elementFinal: string;
  }): boolean {
    for (const coupleElement of this._elements) {
      if (
        coupleElement.some((e) => e.value === elementsTracked.elementInit) &&
        coupleElement.some((e) => e.value === elementsTracked.elementFinal)
      ) {
        return true;
      }
    }
    return false;
  }

  public checkIfElementsSameSide(elementsTracked: {
    elementInit: string;
    elementFinal: string;
  }): boolean {
    const leftElements = this.getElements('left');
    const rightElements = this.getElements('right');
    return (
      (leftElements.some((e) => e.value === elementsTracked.elementInit) &&
        leftElements.some((e) => e.value === elementsTracked.elementFinal)) ||
      (rightElements.some((e) => e.value === elementsTracked.elementInit) &&
        rightElements.some((e) => e.value === elementsTracked.elementFinal))
    );
  }

  public setNewOrdre() {}

  public getElements(
    side: 'left' | 'right',
  ): { type: 'text' | 'image'; value: string }[] {
    return side === 'left' ? this._elementsLeft : this._elementsRight;
  }
}

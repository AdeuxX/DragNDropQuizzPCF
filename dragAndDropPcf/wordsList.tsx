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
export class WordsList {
    private _words: string[][]
    private _wordLeft: string[]
    private _wordRight: string[]

    constructor(words:string[][]){
        this._words = words
        this._wordLeft = words.map((e)=>(e[0])).sort(() => Math.random() - 0.5)
        this._wordRight = words.map((e)=>(e[1])).sort(() => Math.random() - 0.5)
    }

    public checkIfCorrectAssociation(wordsTracked: {wordInit: string, wordFinal: string}): boolean {
        for (const coupleWord of this._words) {
            if (coupleWord.includes(wordsTracked.wordInit) && coupleWord.includes(wordsTracked.wordFinal)) {
                return true
            }
        }
        return false
    }

    public checkIfWordsSameSide(wordsTracked: {wordInit: string, wordFinal: string}): boolean {
        const leftWords = this.getWords("left");
        const rightWords = this.getWords("right");
        return (leftWords.includes(wordsTracked.wordInit) && leftWords.includes(wordsTracked.wordFinal)) ||
               (rightWords.includes(wordsTracked.wordInit) && rightWords.includes(wordsTracked.wordFinal));
    }

    public getWords(side: "left"|"right"): string[] {
        return side === "left" ? this._wordLeft : this._wordRight
    }
}
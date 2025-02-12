import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DragAndDrop from './dragAndDropElement';

export class DragNDrop implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container!: HTMLDivElement;
  private _notifyOutputChanged!: () => void;
  private _nbWrongAnswers: number = 0; // Initialise à 0
  private customStyleElement: HTMLStyleElement | null = null;

  constructor() {
    // Votre logique d'initialisation ici
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._container = container;
    this._notifyOutputChanged = notifyOutputChanged;
    context.mode.trackContainerResize(true);
  }

  // Correction : Déclarer la méthode comme une fonction fléchée pour conserver le contexte "this"
  private setWrongAnswersOutput = (nbWrongAnswers: number): void => {
    this._nbWrongAnswers = nbWrongAnswers;
    this._notifyOutputChanged(); // Notifie que la sortie a changé
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    // Récupérer la valeur de WordsList depuis le contexte
    const wordsListValue = context.parameters.WordsList.raw || "";
    const customStylesValue = context.parameters.CustomStyles.raw || "";

    let wordsListArray: string[][] = [];
    try {
      // Parser la chaîne JSON en un tableau de tableaux
      wordsListArray = JSON.parse(wordsListValue);

      // Vérifier si le format est bien un tableau de tableaux de deux éléments
      if (!Array.isArray(wordsListArray) || !wordsListArray.every(item => Array.isArray(item) && item.length === 2)) {
        console.error("Le format de WordsList est invalide");
        wordsListArray = [];
      }
    } catch (error) {
      console.error("Erreur lors du parsing de WordsList:", error);
    }
    this.applyCustomStyles(customStylesValue);
    // Passer la liste de mots au composant DragAndDrop
    return React.createElement(DragAndDrop, {
      wordsList: wordsListArray,
      allocatedWidth: context.mode.allocatedWidth,
      allocatedHeight: context.mode.allocatedHeight,
      EnableFinalCheck: Boolean(context.parameters.EnableFinalCheck.raw),
      setNbWrongAnswersOutput: this.setWrongAnswersOutput
    });
  }

private applyCustomStyles(customStyles: string): void {
  const head = document.head || document.getElementsByTagName('head')[0];

  // Create a new style element if it doesn't exist
  if (!this.customStyleElement) {
    const style = document.createElement('style');
    head.appendChild(style);
    this.customStyleElement = style;
  }

  // Clear existing rules
  while (this.customStyleElement.sheet?.cssRules.length) {
    this.customStyleElement.sheet.deleteRule(0);
  }

  // Split the custom styles by rule and insert each one
  const rules = customStyles.split('}').map(rule => rule.trim() + '}').filter(rule => {
    // Ensure the rule is not empty and contains both a selector and a declaration
    return rule.includes('{') && rule.includes('}') && rule.includes(':');
  });

  rules.forEach(rule => {
    try {
      if (this.customStyleElement && this.customStyleElement.sheet) {
        (this.customStyleElement.sheet as CSSStyleSheet).insertRule(rule, this.customStyleElement.sheet.cssRules.length);
      } else {
        if (this.customStyleElement) {
          this.customStyleElement.appendChild(document.createTextNode(rule));
        }
      }
    } catch (error) {
      console.error(`Failed to insert rule: ${rule}`, error);
    }
  });
}
  public getOutputs(): IOutputs {
    return { nbWrongAnswers: `${this._nbWrongAnswers}` };
  }

  public destroy(): void {
    // Nettoyer les ressources ici
    ReactDOM.unmountComponentAtNode(this._container);
  }
}

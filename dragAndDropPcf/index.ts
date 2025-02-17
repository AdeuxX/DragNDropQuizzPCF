import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DragAndDrop from './dragAndDropItem';

export class DragNDrop implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container!: HTMLDivElement;
  private _notifyOutputChanged!: () => void;
  private _nbWrongAnswers: number = 0; // Initialise à 0
  private _customStyleElement: HTMLStyleElement | null = null;
  private _previouselementsListValue: string = "";
  private _elementsListArray: string[][] = [];
  constructor() {  }

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

  private setWrongAnswersOutput = (nbWrongAnswers: number): void => {
    this._nbWrongAnswers = nbWrongAnswers;
    this._notifyOutputChanged();
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    // Récupérer la valeur de elementsList depuis le contexte
    const elementsListValue = context.parameters.ElementsList.raw || "";
    const customStylesValue = context.parameters.CustomStyles.raw || "";
    const undoButtonText = context.parameters.UndoButtonText.raw === "val" ? "Undo" : (context.parameters.UndoButtonText.raw || "Undo");
    const verifyButtonText = context.parameters.VerifyButtonText.raw === "val" ? "Check Answers" : (context.parameters.VerifyButtonText.raw || "Check Answers");
    const incorrectMessage = context.parameters.IncorrectMessage.raw === "val" ? "Incorrect" : (context.parameters.IncorrectMessage.raw || "Incorrect");
    const congratulationsMessage = context.parameters.CongratulationsMessage.raw === "val" ? "Congratulations" : (context.parameters.CongratulationsMessage.raw || "Congratulations");

    if (elementsListValue !== this._previouselementsListValue) {
      this._previouselementsListValue = elementsListValue;

      try {
          this._elementsListArray = JSON.parse(elementsListValue);
          if (!Array.isArray(this._elementsListArray) || !this._elementsListArray.every(item => Array.isArray(item) && item.length === 2)) {
              console.error("Le format de elementsList est invalide");
              this._elementsListArray = [];
          }
      } catch (error) {
          console.error("Erreur lors du parsing de elementsList:", error);
          this._elementsListArray = [];
      }
    } 
      this.applyCustomStyles(customStylesValue);
      return React.createElement(DragAndDrop, {
        elementsList: this._elementsListArray,
        allocatedWidth: context.mode.allocatedWidth,
        allocatedHeight: context.mode.allocatedHeight,
        EnableFinalCheck: Boolean(context.parameters.EnableFinalCheck.raw),
        setNbWrongAnswersOutput: this.setWrongAnswersOutput,
        undoButtonText: undoButtonText,
        verifyButtonText: verifyButtonText,
        incorrectMessage: incorrectMessage,
        congratulationsMessage: congratulationsMessage
      });
    }

  private applyCustomStyles(customStyles: string): void {
    const head = document.head || document.getElementsByTagName('head')[0];

    if (!this._customStyleElement) {
      const style = document.createElement('style');
      style.id = 'raoul-custom-styles';
      head.appendChild(style);
      this._customStyleElement = style;
    }
    // console.log(this._customStyleElement)
    // Clear existing rules
    while (this._customStyleElement.sheet?.cssRules.length) {
      this._customStyleElement.sheet.deleteRule(0);
    }
    // console.log(this._customStyleElement)
    // Split the custom styles by rule and insert each one
    const rules = customStyles.split('}').map(rule => rule.trim() + '}').filter(rule => {
      // Ensure the rule is not empty and contains both a selector and a declaration
      return rule.includes('{') && rule.includes('}') && rule.includes(':');
    });

    rules.forEach(rule => {
      // console.log(this._customStyleElement)
      try {
        if (this._customStyleElement && this._customStyleElement.sheet) {
          (this._customStyleElement.sheet as CSSStyleSheet).insertRule(rule, this._customStyleElement.sheet.cssRules.length);
          // console.log(this._customStyleElement)

        } else {
          if (this._customStyleElement) {
            this._customStyleElement.appendChild(document.createTextNode(rule));
          }
        }
        // console.log(this._customStyleElement)
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

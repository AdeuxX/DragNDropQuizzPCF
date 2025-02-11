import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import ReactComponent from './src/ReactComponent';
import DragAndDrop from './dragAndDropElement';

export class DragNDrop implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container!: HTMLDivElement;
    private _notifyOutputChanged!: () => void;

    constructor() {
      // Your initialization logic here
    }
    public init(
      context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void,
      state: ComponentFramework.Dictionary,
      container: HTMLDivElement
    ): void {
      this._container = container;
      this._notifyOutputChanged = notifyOutputChanged;
      context.mode.trackContainerResize(true)
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      // Récupérer la valeur de WordsList depuis le contexte
      const wordsListValue = context.parameters.WordsList.raw || "";
      
    
      let wordsListArray: string[][] = [];
    
      try {
        // Parser la chaîne JSON en un tableau de tableaux
        wordsListArray = JSON.parse(wordsListValue);
        
        // Vérifier si le format est bien un tableau de tableaux
        if (!Array.isArray(wordsListArray) || !wordsListArray.every(item => Array.isArray(item) && item.length === 2)) {
          console.error("Le format de WordsList est invalide");
          wordsListArray = [];
        }
      } catch (error) {
        console.error("Erreur lors du parsing de WordsList:", error);
      }
    
      // Passer la liste de mots au composant DragAndDrop
      this._notifyOutputChanged();
      return React.createElement(DragAndDrop, { wordsList: wordsListArray, allocatedWidth: context.mode.allocatedWidth, allocatedHeight: context.mode.allocatedHeight, EnableFinalCheck: Boolean(context.parameters.EnableFinalCheck.raw)  });
    }
    
    public getOutputs(): IOutputs {
      // Return your outputs here
      return {};
    }
    public destroy(): void {
      // Cleanup resources here
      ReactDOM.unmountComponentAtNode(this._container);
    }
  }
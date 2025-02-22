# DragNDropQuizzPCF

DragNDropQuizzPCF is a customizable drag-and-drop quiz component for PowerApps. It allows power apps developers to create interactive quizzes with complete customization options for both the words used in the quiz and the appearance through custom CSS. The component is designed to be responsive and dynamic, adapting to various screen sizes and power apps developers interactions. This quiz user to create visual associations between two words from two different lists and verify the associations.

![Visuel of the empty component](https://github.com/AdeuxX/DragNDropQuizzPCF/blob/main/imagesReadme/ScreenshotEmpty.png)

# Table of Contents

1. [Introduction](#dragndropquizzpcf)
2. [Features](#features)
3. [Outputs](#outputs)
4. [Accessibility](#accessibility)
5. [Installation Guide](#installation-guide)
6. [Pushing the Component to PowerApps](#pushing-the-component-to-powerapps)
7. [How to Use the Component](#how-to-use-the-component)
8. [Technical Operation](#technical-operation)
9. [Conclusion](#conclusion)

## Features

- **Complete Customization**: Power apps developers can customize the words used in the quiz by providing a JSON array directly from the PowerApps application dev environnement. Additionally, power apps developers can apply their own CSS styles to change the appearance of the component dynamically.

- **Support for Images**: Power Apps developers can include images in the quiz, in addition to words. Images should be provided in base64 format, ensuring to keep the `data:image/` prefix, or directly as an image URL. This feature enhances the visual appeal of the quiz and allows for more diverse and engaging content.

- **Random Order**: The order of the quiz elements is always randomized to ensure a unique experience each time the quiz is played.

- **Two Verification Modes**: The component supports two modes of verification for answers, allowing power apps developers to choose how they want to validate the responses. The first mode provides real-time verification, where answers are checked immediately as the user associates 2 words. The second mode includes a "Verify Answer" button that users can click at the end to check all their answers at once.

- **Responsive and Dynamic Design**: The component is built to be responsive, ensuring it looks great on any device. It dynamically adjusts its layout based on the allocated width and height provided by PowerApps. Additionally, when there are many elements, users can scroll within the component to view all content, ensuring a smooth and accessible experience.

## Outputs

The DragNDropQuizzPCF component provides two outputs to Power Apps:

- **`<ComponentName>.nbWrongAnswer`**: This output returns the number of incorrect answers in the quiz. It allows developers to track the user's performance and provide feedback accordingly.

- **`<ComponentName>.allAnswerCorrect`**: This boolean output indicates whether all answers in the quiz are correct. It returns `true` if all answers are correct and `false` otherwise. This output is useful for determining if the user has successfully completed the quiz.

These outputs are notified to Power Apps when the user clicks the "Verify Answer" button if the `EnableFinalCheck` option is set to `true`. If `EnableFinalCheck` is set to `false`, the outputs are provided in real-time as the user makes associations.

## Accessibility

The DragNDropQuizzPCF component is designed to be accessible to users who rely on keyboard navigation. The component is fully navigable using the keyboard, and the Enter key can be used to simulate a mouse click.

However, there are some limitations to note:

- Currently, screen readers do not announce the word associations made by the user.
- Visually impaired users do not have a way to determine which of their answers are correct or incorrect at the end of the quiz, unlike sighted users who can see visual feedback.

We are actively working to improve these aspects and make the component fully accessible to all users.

## Installation Guide

1. **Clone the Repository**: Start by cloning the repository to your local machine using the following command:

   ```
   git clone https://github.com/AdeuxX/DragNDropQuizzPCF.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm:

   ```
   cd DragNDropQuizzPCF
   npm install
   ```

3. **Build the Project**: Compile the TypeScript files and bundle the project:
   ```
   npm run build
   ```

## Pushing the Component to PowerApps

1. **Package the Component**: After building the project, package the component for deployment. Ensure that the output files are correctly structured as per PowerApps requirements.

2. **Import into PowerApps**: Open your PowerApps environment and navigate to the "Solutions" section. Click on "Import" and select the packaged component file.

3. **Configure the Component**: Once imported, you can add the DragNDrop component to your app. Configure the input parameters such as `WordsList`, `CustomStyles`, and `EnableFinalCheck` as needed.

4. **Test the Component**: After adding the component, test it within your PowerApps application to ensure it functions as expected.

## How to Use the Component

1. **Add the Component to Your App**: After importing the DragNDropQuizzPCF component into your PowerApps environment, add it to your app by selecting it from the list of available components.

2. **Configure Input Parameters**: Set up the necessary input parameters for the component:

   - `WordsList`: Provide a JSON array of words that will be used in the quiz. The array should be of type `string[][]`. Here is an example:

   ```json
   [
     ["pomme", "apple"],
     ["chien", "dog"],
     ["maison", "house"],
     ["école", "school"],
     ["voiture", "car"],
     ["livre", "book"],
     ["soleil", "sun"],
     ["ordinateur", "computer"],
     ["fleur", "flower"]
   ]
   ```

   - `CustomStyles`: Apply your own CSS styles to customize the appearance of the component. This allows you to implement your own branding guidelines, change the orientation of the component, add animations, and more. Thre string should be directly in CSS syntax. Here is an example :

   ```css
   .buttons-container {
     display: flex;
     justify-content: center;
     padding: 10px 0;
   }

   .button:hover {
     background-color: red;
   }
   ```

   - **`#dragAndDropContainer`**: Main container for the drag-and-drop quiz.

   - **`.columns-container`**: Container holding the columns of words or images.

   - **`.column-container`**: Individual column within the `.columns-container`.

   - **`.word-container-left`** and **`.word-container-right`**: Containers for the left and right columns of words.

   - **`.buttons-container`**: Container for action buttons.

   - **`.button-dnd`**: Styles for the action buttons.

   - **`.button-dnd:hover`**: Styles for the button when hovered over.

   - **`.button-dnd:disabled`**: Styles for the button when it is disabled.

   - **`.svg-overlay`**: Overlay for SVG elements.

   - **`.thread-line`**: svg Lines drawn when 2 elements relied.

   - **`.thread-line.final-check`**, **`.thread-line.right-answer`**, **`.thread-line.wrong-answer`**: Specific states of the static thread lines svg.

   - **`.dynamic-thread-line`**: styles of thread lines svg.

   - **`.list-element`**: List elements within the quiz.

   - **`.element-display`**, **`.element-display.left`**, **`.element-display.right`**: Display elements div within the list.

   - **`.image-element`**: Image elements.

   - **`.word-element`**: Word elements.

   - **`.congratulations-title`** and **`.incorrect-title`**: Messages for congratulations and incorrect messages.

   - **`.congratulations-message`** and **`.incorrect-message`**: Messages displayed upon completion.

   - **`.point-element`**: Point elements.

   - **`.incorrect-logo`** and **`.correct-logo`**: Logos for incorrect and correct answers.
   - `EnableFinalCheck`: Choose whether to enable the final verification mode where users can check all their answers at once. When set to `true`, users must press a button to verify their answers, and they have no way of knowing if their answers are correct until they press the button. When set to `false`, the lines will immediately turn green or red depending on whether the answer is correct.

![Enable Final Check False Screenshot](https://github.com/AdeuxX/DragNDropQuizzPCF/blob/main/imagesReadme/ScreenshotEnableFinalCheckFalse.png)
_Caption: Example of a quiz with real-time verification (Enable Final Check = False). Answers are checked immediately._

![Enable Final Check True Button Pressed False Screenshot](https://github.com/AdeuxX/DragNDropQuizzPCF/blob/main/imagesReadme/ScreenshotEnableFinalCheckTrueButtonPressedFalse.png)
_Caption: Example of a quiz with final verification (Enable Final Check = True) before pressing the "Verify Answer" button. Answers are not yet verified._

![Enable Final Check True Button Pressed True Screenshot](https://github.com/AdeuxX/DragNDropQuizzPCF/blob/main/imagesReadme/ScreenshotEnableFinalCheckTrueButtonPressedTrue.png)
_Caption: Example of a quiz with final verification (Enable Final Check = True) after pressing the "Verify Answer" button. Answers are now verified._

    - **Button Text Customization**: You can also customize the text of the "Undo" and "Verify Answer" buttons to better suit your application. For example, you can change "Undo" to "Annuler" and "Verify Answer" to "Vérifier la Réponse" for a French application.

    - **Customizable Feedback Messages**: You can customize the messages displayed to users when they complete the quiz. The `CorrectMessage` and `IncorrectMessage` parameters allow you to set personalized feedback for correct and incorrect answers, respectively. This feature enhances user engagement by providing tailored responses based on their performance.

By following these steps, you can fully customize the DragNDropQuizzPCF component to fit the specific needs and design of your PowerApps application.

## Technical Operation

### Component Architecture

The DragNDropQuizzPCF component is built using TypeScript and leverages the PowerApps Component Framework (PCF) to integrate seamlessly with PowerApps. The component utilizes SVG for rendering draggable elements and CSS for styling, ensuring a responsive and dynamic user experience.

### Key Technical Aspects

- **SVG Rendering**: The component uses SVG to draw lines and other graphical elements, providing a smooth and interactive drag-and-drop experience.

  - **Dynamic SVG Lines**: These lines are drawn dynamically based on user interactions. The starting point of the line is the initial position of the mouse when the user begins to drag. The endpoint is the current position of the mouse as it moves.
  - **Static SVG Lines**: These lines are drawn with fixed coordinates. The starting point is the center of the button associated with a word, and the endpoint is the final position where the word is dropped.
  - **Simulated Drag-and-Drop**: The component simulates a drag-and-drop experience by drawing lines that follow the mouse cursor rather than actually dragging objects. This approach provides visual feedback and enhances the interactive nature of the quiz.

- **Customization**: The component supports extensive customization through JSON arrays for quiz content and CSS for styling, allowing developers to tailor the component to their specific needs.

- **CSS Transformations**: During the implementation in PowerApps, an unexpected and undocumented CSS transformation may occur. This transformation can affect the positioning of elements within the component. For more details on handling coordinates in PCFs, refer to the following resource: [How to Work with Coordinates in PCFs](https://dianabirkelbach.wordpress.com/2024/08/24/how-to-work-with-coordinates-in-pcfs/)

**Warning**:

> During local testing with `npm run start`, the SVG coordinate system (0,0) starts at the top-left corner of the page. However, within the PowerApps environment, the SVG coordinate system (0,0) starts at the top-left corner of the component itself. This creates a shift, which is normal and expected, but it will not occur once the component is deployed in the PowerApps application. By uncommenting a specific section in `statictThreadsElement.tsx`, you can prevent this shift during local testing. However, make sure to re-comment this section before deploying the solution.

By understanding these technical aspects, you can effectively develop, test, and deploy the DragNDropQuizzPCF component in your PowerApps applications.

## Conclusion

The DragNDropQuizzPCF component provides a powerful and flexible way to create interactive quizzes in PowerApps. With its customization options and responsive design, it enhances power apps developers engagement and learning experiences. For further assistance, please refer to the documentation.

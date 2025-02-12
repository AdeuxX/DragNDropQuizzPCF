
# DragNDropQuizzPCF

DragNDropQuizzPCF is a customizable drag-and-drop quiz component for PowerApps. It allows power apps developers to create interactive quizzes with complete customization options for both the words used in the quiz and the appearance through custom CSS. The component is designed to be responsive and dynamic, adapting to various screen sizes and power apps developers interactions. This quiz user to create visual associations between two words from two different lists and verify the associations.

## Features

- **Complete Customization**: Power apps developers can customize the words used in the quiz by providing a JSON array directly from the PowerApps application dev environnement. Additionally, power apps developers can apply their own CSS styles to change the appearance of the component dynamically.
- **Two Verification Modes**: The component supports two modes of verification for answers, allowing power apps developers to choose how they want to validate the responses. The first mode provides real-time verification, where answers are checked immediately as the user associates 2 words. The second mode includes a "Verify Answer" button that users can click at the end to check all their answers at once.

- **Responsive and Dynamic Design**: The component is built to be responsive, ensuring it looks great on any device. It dynamically adjusts its layout based on the allocated width and height provided by PowerApps. Additionally, when there are many elements, users can scroll within the component to view all content, ensuring a smooth and accessible experience.

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

## Conclusion

The DragNDropQuizzPCF component provides a powerful and flexible way to create interactive quizzes in PowerApps. With its customization options and responsive design, it enhances power apps developers engagement and learning experiences. For further assistance, please refer to the documentation or reach out to the support team.
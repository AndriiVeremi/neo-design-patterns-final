# Final Project

# "Resume Generator from JSON Description"

## Task Description

In this final homework assignment, you need to implement a resume generator that demonstrates the application of five design patterns: Facade, Template Method, Factory Method, Composite, and Decorator.

The task aims to teach you:

- How to correctly apply design patterns in practical scenarios
- How to create a modular, extensible architecture
- How to structure code using patterns

A self-contained HTML resume page must be generated from a single data source - the `resume.json` file. All styles are fixed in `styles.css`, and no third-party libraries or frameworks are used. After compiling `main.ts` and opening `index.html`, the page should display the full resume without errors, and projects with the `"isRecent": true` flag should be highlighted in red.

# Final Project

# "Resume Generator from JSON Description"

## Task Description

In this final homework assignment, you need to implement a resume generator that demonstrates the application of five design patterns: Facade, Template Method, Factory Method, Composite, and Decorator.

The task aims to teach you:

- How to correctly apply design patterns in practical scenarios
- How to create a modular, extensible architecture
- How to structure code using patterns

A self-contained HTML resume page must be generated from a single data source - the `resume.json` file. All styles are fixed in `styles.css`, and no third-party libraries or frameworks are used. After compiling `main.ts` and opening `index.html`, the page should display the full resume without errors, and projects with the `"isRecent": true` flag should be highlighted in red.

## Implemented Patterns

- **Facade**: `ResumePage.ts` provides a simplified interface for loading and displaying the resume. It hides the complexity of fetching data, validation, and rendering.
- **Template Method**: `AbstractImporter.ts` defines the skeleton of the import algorithm, while `ResumeImporter.ts` implements the specific steps for validation, mapping, and rendering.
- **Factory Method**: `BlockFactory.ts` creates different types of resume blocks (`header`, `summary`, etc.) without exposing the instantiation logic to the client.
- **Composite**: `ExperienceBlock.ts` acts as a container for `ProjectBlock` instances, allowing them to be treated as a single unit.
- **Decorator**: `HighlightDecorator.ts` adds highlighting functionality to any block that implements the `IBlock` interface, without altering the block's class.

## Project Structure

```
/
├── index.html                  # Static page layout
├── resume.json                 # Data source for the page
├── vite.config.js              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── dist/                       # Build directory
└── src/
    ├── styles.css              # Base styles + .highlight
    ├── facade/
    │   └── ResumePage.ts       # Project facade
    ├── importer/
    │   ├── AbstractImporter.ts # Base Template Method
    │   └── ResumeImporter.ts   # Concrete implementation
    ├── blocks/                 # Concrete resume blocks
    │   ├── BlockFactory.ts     # Factory Method
    │   ├── HeaderBlock.ts
    │   ├── SummaryBlock.ts
    │   ├── ExperienceBlock.ts  # Composite container
    │   ├── ProjectBlock.ts
    │   ├── EducationBlock.ts
    │   └── SkillsBlock.ts
    ├── decorators/
    │   └── HighlightDecorator.ts
    ├── models/
    │   └── ResumeModel.ts      # Internal model types
    └── main.ts                 # Entry point
```

## How to Run Compilation and View the Result

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run in development mode**:
   ```bash
   npm run dev
   ```
   This command will start a local server. Open the URL provided in the console to see the result.
3. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled files will be placed in the `dist` directory.
4. **Preview the build**:
   ```bash
   npm run preview
   ```
   This command will serve the `dist` directory, allowing you to check the production build locally.

## How to Add a New Resume Block (e.g., "Certificates")

1. **Create a new block class**:
   Create a file `src/blocks/CertificatesBlock.ts` with the following content:
   ```typescript
   import { IBlock } from "./BlockFactory";

   export class CertificatesBlock implements IBlock {
     constructor(private data: any) {} // Define your data type

     render(): HTMLElement {
       const section = document.createElement("section");
       section.className = "section certificates";
       section.innerHTML = "<h2>Certificates</h2>";
       // Add your rendering logic here
       return section;
     }
   }
   ```
2. **Update the `BlockFactory`**:
   Open `src/blocks/BlockFactory.ts` and add a new case to the `createBlock` method:
   ```typescript
   import { CertificatesBlock } from "./CertificatesBlock"; // Import the new block

   // ...

   export type BlockType = "header" | "summary" | "experience" | "education" | "skills" | "certificates";

   export class BlockFactory {
     createBlock(type: BlockType, m: ResumeModel): IBlock {
       switch (type) {
         // ... existing cases
         case "certificates":
           return new CertificatesBlock(m.certificates); // Assuming `certificates` is part of your model
         default:
           throw new Error(`Unknown block type: ${type}`);
       }
     }
   }
   ```
3. **Update the `ResumeModel`**:
   Open `src/models/ResumeModel.ts` and add the new field to the `ResumeModel` interface:
   ```typescript
   export interface ResumeModel {
     // ... existing fields
     certificates: any[]; // Define your data type
   }
   ```
4. **Update the `ResumeImporter`**:
   Open `src/importer/ResumeImporter.ts` and add the new block to the `render` method:
   ```typescript
   protected render(model: ResumeModel): void {
     const root = document.getElementById("resume-content")!;
     const factory = new BlockFactory();

     root.append(
       // ... existing blocks
       factory.createBlock("certificates", model).render()
     );
   }
   ```

## Technologies

- TypeScript
- Vite (build and development)
- Design Patterns
- JSON for data storage
- CSS for styling


## Running the Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Development mode:

   ```bash
   npm run dev
   ```

3. Production build:

   ```bash
   npm run build
   ```

4. Preview the build:
   ```bash
   npm run preview
   ```

## Technologies

- TypeScript
- Vite (build and development)
- Design Patterns
- JSON for data storage
- CSS for styling
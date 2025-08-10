import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private data: Experience[]) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section experience";
    section.innerHTML = "<h2>Experience</h2>";

    this.data.forEach((exp) => {
      const div = document.createElement("div");
      div.className = "experience-item";
      div.innerHTML = `<strong>${exp.position}</strong> at <em>${exp.company}</em> (${exp.start} – ${exp.end})`;

      exp.projects.forEach((p) => {
        const block = new ProjectBlock(p);
        const decorated = p.isRecent ? new HighlightDecorator(block) : block;
        div.appendChild(decorated.render());
      });

      section.appendChild(div);
    });

    return section;
  }
}

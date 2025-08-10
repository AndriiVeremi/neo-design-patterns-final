import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education[]) {}

  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section education";
    el.innerHTML = `<h2>Education</h2>`;

    this.d.forEach(edu => {
      const item = document.createElement('div');
      item.className = 'education-item';
      item.innerHTML = `
        <h3>${edu.degree} in ${edu.field}</h3>
        <p>${edu.institution} (${edu.graduation})</p>
      `;
      el.appendChild(item);
    });

    return el;
  }
}

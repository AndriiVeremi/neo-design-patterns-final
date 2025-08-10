import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    header.innerHTML = `
      <h1>${this.d.fullName}</h1>
      <p><em>${this.d.title}</em></p>
      <p>${this.d.contacts.email} ${this.d.contacts.phone} ${this.d.contacts.location}</p>
    `;

    return header;
  }
}

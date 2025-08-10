import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    const r = this.raw as ResumeModel;
    if (!r.header || !r.summary || !r.experience || !r.education || !r.skills) {
      throw new Error("Неприпустимий формат JSON: відсутні обов’язкові поля");
    }
  }

  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content")!;
    const factory = new BlockFactory();

    root.append(
      factory.createBlock("header", model).render(),
      factory.createBlock("summary", model).render(),
      factory.createBlock("experience", model).render(),
      factory.createBlock("education", model).render(),
      factory.createBlock("skills", model).render()
    );
  }
}

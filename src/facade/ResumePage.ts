import { ResumeImporter } from "../importer/ResumeImporter";

export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    const data = await this.fetchData(jsonPath);
    new ResumeImporter(data).import();
  }

  private async fetchData(path: string): Promise<unknown> {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error("Не вдалося завантажити JSON");
    }
    return res.json();
  }
}

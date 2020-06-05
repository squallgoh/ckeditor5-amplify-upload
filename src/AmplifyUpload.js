import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";

import Adapter from "./Adapter";

export default class AmplifyUpload extends Plugin {
  static get requires() {
    return [FileRepository];
  }

  static get pluginName() {
    return "AmplifyUpload";
  }

  init() {
    const storage = this.editor.config.get("AmplifyUpload.storage");
    const namePrefix = this.editor.config.get("AmplifyUpload.namePrefix");

    if (!storage) {
      console.warn(
        "You have not passed in the AWS Storage Object as the editor config"
      );
      return;
    }

    this.editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      new Adapter(loader, storage, namePrefix, this.editor.t);
  }
}

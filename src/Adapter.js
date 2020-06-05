export default class Adapter {
  constructor(loader, storage, namePrefix, t) {
    this.loader = loader;
    this.storage = storage;
    this.namePrefix = namePrefix;
    this.t = t;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this._sendRequest(resolve, reject);
    });
  }

  abort() {}

  _sendRequest(resolve, reject) {
    this.loader.file
      .then((file) => {
        // Prepare the form data.
        const storage = this.storage;
        const filename = this.namePrefix + file.name;
        const extension = file.name.slice(file.name.lastIndexOf(".") + 1);
        let mimeType;
        switch (extension) {
          case "svg":
            mimeType = "image/svg+xml";
            break;
          case "jpg":
            mimeType = "image/jpeg";
            break;
          case "png":
            mimeType = "image/png";
            break;
        }
        storage
          .put(filename, file, { contentType: mimeType })
          .then((result) => {
            const key = result.key;
            storage.get(key).then((data) => {
              const i = data.indexOf("?");
              const uri = data.slice(0, i);
              resolve({
                default: uri,
              });
            });
          });
      })
      .catch(reject);
  }
}

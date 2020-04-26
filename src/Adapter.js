export default class Adapter {
  constructor(loader, storage, t) {
    this.loader = loader;
    this.storage = storage;
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
      .then(file => {
        // Prepare the form data.
        const storage = this.storage;
        storage.put(file.name, file).then(result => {
          const key = result.key;
          storage.get(key).then(data => {
            const i = data.indexOf("?");
            const uri = data.slice(0, i);
            resolve({
              default: uri
            });
          });
        });
      })
      .catch(reject);
  }
}

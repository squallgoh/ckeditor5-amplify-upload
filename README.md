## Upload image from within AWS Amplify React app to S3 Bucket using CKEditor5

Credits: CKEditor team for the wonderful WYSIWYG product. Inspired by pourquoi's ckeditor5-simple-upload

### Build Integration - see CKEditor documentation for custom editor build

https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html

This example uses the ckeditor5-build-classic.

First git clone the ckeditor5-build-classic from its github repository.

Then run the following commands from the directory:

```
npm install
npm i @squallgoh/ckeditor5-amplify-upload
```

Add this plugin and remove the ckfinder and easyimage plugins in ckeditor.js

```javascript
// src/ckeditor.js

import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
//import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import AmplifyUpload from '@squallgoh/ckeditor5-amplify-upload/src/AmplifyUpload';

// ...

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
//	CKFinder,
//	EasyImage,
	Heading,
    Image,
    AmplifyUpload
    // ...
]
    // ...
}
```

### Build package

Save your files and build the ckeditor5.

```
npm run build
```

You can then upload to NPM or install locally to your Amplify React app.

```
npm install --save <LOCAL DIRECTORY>/ckeditor5-build-classic
```

### Configuration

Place the CKEditor component within your AWS Amplify React App.
Storage must already be configured and bucket policy must be set to public or relevant CORS must be setup.
See AWS Video Tutorial for assistance on AWS S3: https://youtu.be/5YkGYB0qdzc
See AWS Docs on AWS S3 Bucket access policy: https://aws.amazon.com/premiumsupport/knowledge-center/read-access-objects-s3-bucket/
Pass in the Storage object as a _prop_ to CKEditor component.
The adapter will put the image into your pre-configured S3 Bucket and return the URL.
CKEditor5 will display the image within the editor if upload is successful.

```javascript
import React, { useState } from "react";
import { Storage } from "aws-amplify";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const App = props => {
  const [formData, setFormData] = useState("");

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        // IMPORTANT - Pass in the AWS Storage object as a prop
        config={{
          AmplifyUpload: {
            storage: Storage
          }
        }}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFormData(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <div>
        <h3>Form Data Below</h3>
        <div>Data: {formData}</div>
      </div>
    </div>
  );
};

export default App;
```

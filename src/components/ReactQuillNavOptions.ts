export const QuillModules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }], // Custom dropdown
      [{ 'font': [] }],
      [{ 'align': [] }], // Add align options
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link'],
      ['clean'] // Remove formatting button
    ],
  };
  
 export const QuillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'align',
  ];

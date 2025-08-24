export function transformFileToBase64(data: FileList | File) {
  return new Promise((resolve, reject) => {
    const file = data instanceof FileList ? data.item(0) : data;
    if (!file) throw new Error('There is no file!');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', () => {
      reject(null);
    });
  });
}

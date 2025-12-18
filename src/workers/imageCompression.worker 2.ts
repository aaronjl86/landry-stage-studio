import imageCompression from 'browser-image-compression';

self.addEventListener('message', async (e) => {
  const { file, options } = e.data;
  
  try {
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    
    reader.onload = () => {
      self.postMessage({
        success: true,
        data: reader.result,
        fileName: file.name,
        size: (reader.result as string).length
      });
    };
    
    reader.onerror = () => {
      self.postMessage({
        success: false,
        error: 'Failed to read compressed file'
      });
    };
    
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    self.postMessage({
      success: false,
      error: error instanceof Error ? error.message : 'Compression failed'
    });
  }
});

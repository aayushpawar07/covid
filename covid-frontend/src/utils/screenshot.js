import html2canvas from 'html2canvas';

/**
 * Capture screenshot of a specific element or the entire page
 * @param {HTMLElement|string} element - DOM element or selector to capture
 * @param {Object} options - html2canvas options
 * @returns {Promise<Blob>} - Promise that resolves to image blob
 */
export const captureScreenshot = async (element = document.body, options = {}) => {
  try {
    // Default options for better quality
    const defaultOptions = {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: null,
      allowTaint: true,
      ...options,
    };

    // Get the element if selector string is provided
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;

    if (!targetElement) {
      throw new Error('Element not found');
    }

    // Capture the screenshot
    const canvas = await html2canvas(targetElement, defaultOptions);
    
    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        0.95 // Quality (0-1)
      );
    });
  } catch (error) {
    console.error('Screenshot capture error:', error);
    throw error;
  }
};

/**
 * Download screenshot as PNG file
 * @param {Blob} blob - Image blob
 * @param {string} filename - Name for the downloaded file
 */
export const downloadScreenshot = (blob, filename = 'screenshot') => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Capture and download screenshot in one function
 * @param {HTMLElement|string} element - Element to capture
 * @param {string} filename - Filename for download
 * @param {Object} options - html2canvas options
 */
export const captureAndDownload = async (element = document.body, filename = 'covid-dashboard', options = {}) => {
  try {
    const blob = await captureScreenshot(element, options);
    downloadScreenshot(blob, filename);
    return true;
  } catch (error) {
    console.error('Failed to capture and download screenshot:', error);
    throw error;
  }
};


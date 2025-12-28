// src/components/admin/DocumentViewer.js
import React, { useState, useEffect, useRef } from 'react';

const DocumentViewer = ({ document, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('auto'); // 'auto', 'download', 'preview'
  const [textContent, setTextContent] = useState(null);
  const iframeRef = useRef(null);

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl && pdfUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfUrl);
      }
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [pdfUrl, imageUrl]);

  // Get the actual document URL with Base64 support
  const getDocumentUrl = () => {
    if (!document) return null;

    console.log('📄 Document data for viewing:', document);

    // Priority 1: Base64 data (from Flutter app)
    if (document.base64_data) {
      try {
        // If it's already a data URL
        if (document.base64_data.startsWith('data:')) {
          return document.base64_data;
        } else {
          // Convert base64 string to data URL
          const fileName = document.name || 'document';
          const extension = fileName.split('.').pop()?.toLowerCase();
          const mimeTypes = {
            'pdf': 'application/pdf',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'txt': 'text/plain',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          };
          const mimeType = mimeTypes[extension] || 'application/octet-stream';
          const dataUrl = `data:${mimeType};base64,${document.base64_data}`;
          console.log('✅ Created data URL from base64:', dataUrl.substring(0, 100) + '...');
          return dataUrl;
        }
      } catch (error) {
        console.error('❌ Error processing base64 document:', error);
        setError(`Base64 processing error: ${error.message}`);
        return null;
      }
    }

    // Priority 2: Direct URL
    if (document.url) {
      return document.url;
    }

    // Priority 3: File path
    if (document.file_path) {
      return document.file_path;
    }

    return null;
  };

  // Determine file type
  const getFileType = () => {
    const fileName = document?.name || '';
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const pdfExtensions = ['pdf'];
    const textExtensions = ['txt', 'text'];
    const officeExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
    
    if (imageExtensions.includes(extension)) return 'image';
    if (pdfExtensions.includes(extension)) return 'pdf';
    if (textExtensions.includes(extension)) return 'text';
    if (officeExtensions.includes(extension)) return 'office';
    
    return 'unknown';
  };

  const fileType = getFileType();
  const documentUrl = getDocumentUrl();

  // Check if it's a local file path
  const isLocalFile = documentUrl && (
    documentUrl.startsWith('/data/') || 
    documentUrl.startsWith('file://') ||
    documentUrl.includes('com.example.investtraker') ||
    documentUrl.startsWith('content://') ||
    !documentUrl.startsWith('http') && !documentUrl.startsWith('data:')
  );

  // Load document based on type
  useEffect(() => {
    const loadDocument = async () => {
      if (!documentUrl) {
        setLoading(false);
        setError('No document URL or data available');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`🔄 Loading ${fileType} document:`, documentUrl.substring(0, 100));

        switch (fileType) {
          case 'image':
            // For images, use the URL directly
            if (documentUrl.startsWith('data:') || documentUrl.startsWith('http')) {
              setImageUrl(documentUrl);
              setViewMode('preview');
            } else {
              setViewMode('download');
            }
            break;

          case 'pdf':
            if (documentUrl.startsWith('data:')) {
              // For base64 PDF, create blob URL
              const response = await fetch(documentUrl);
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              setPdfUrl(url);
              setViewMode('preview');
            } else if (documentUrl.startsWith('http')) {
              setPdfUrl(documentUrl);
              setViewMode('preview');
            } else {
              setViewMode('download');
            }
            break;

          case 'text':
            if (documentUrl.startsWith('data:')) {
              // Extract base64 text content
              const base64Data = documentUrl.split(',')[1];
              const text = atob(base64Data);
              setTextContent(text);
              setViewMode('preview');
            } else if (documentUrl.startsWith('http')) {
              const response = await fetch(documentUrl);
              const text = await response.text();
              setTextContent(text);
              setViewMode('preview');
            } else {
              setViewMode('download');
            }
            break;

          case 'office':
          case 'unknown':
            setViewMode('download');
            break;

          default:
            setViewMode('download');
        }
      } catch (err) {
        console.error('❌ Error loading document:', err);
        setError(`Failed to load document: ${err.message}`);
        setViewMode('download');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [documentUrl, fileType]);

  // Handle download
  const handleDownload = async () => {
    if (!documentUrl) {
      setError('No document URL available for download');
      return;
    }

    try {
      // For local files
      if (isLocalFile) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'DOWNLOAD_FILE',
            filePath: documentUrl,
            fileName: document.name
          }));
          return;
        }
        
        alert(`Local file path:\n${documentUrl}\n\nPlease navigate to this path in your file manager.`);
        return;
      }

      // For data URLs and web URLs
      let downloadUrl = documentUrl;
      let fileName = document.name || 'document';

      // If it's a base64 data URL, create a blob for download
      if (documentUrl.startsWith('data:')) {
        const response = await fetch(documentUrl);
        const blob = await response.blob();
        downloadUrl = URL.createObjectURL(blob);
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL if created
      if (downloadUrl.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
      }

      console.log('✅ Download initiated:', fileName);
    } catch (err) {
      console.error('❌ Download failed:', err);
      setError('Download failed: ' + err.message);
    }
  };

  // Handle print
  const handlePrint = () => {
    if (fileType === 'pdf' && iframeRef.current) {
      iframeRef.current.contentWindow.print();
    } else {
      window.print();
    }
  };

  // Render document content based on type and view mode
  const renderDocumentContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading document...</p>
          <p className="text-sm text-gray-500 mt-2">
            {fileType === 'pdf' && 'Preparing PDF viewer...'}
            {fileType === 'image' && 'Loading image...'}
            {fileType === 'text' && 'Reading text content...'}
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4 text-red-500">❌</div>
          <p className="text-lg text-red-600 mb-2">Error Loading Document</p>
          <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Download Instead
            </button>
            {isLocalFile && (
              <div className="text-xs text-gray-500 p-3 bg-gray-100 rounded max-w-md mx-auto">
                <p className="font-semibold">Local File Path:</p>
                <p className="break-all font-mono">{documentUrl}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (viewMode === 'download') {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📥</div>
          <p className="text-lg font-semibold mb-2">Download Required</p>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {isLocalFile 
              ? 'This file is stored locally on your device and needs to be accessed through download.'
              : 'This file type requires download for viewing.'
            }
          </p>
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
            >
              <span className="mr-2">⬇️</span>
              {isLocalFile ? 'Access File' : 'Download File'}
            </button>
            {isLocalFile && (
              <div className="text-xs text-gray-500 p-3 bg-gray-100 rounded max-w-md mx-auto">
                <p className="font-semibold">File Location:</p>
                <p className="break-all font-mono">{documentUrl}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Preview modes
    switch (fileType) {
      case 'image':
        return (
          <div className="flex justify-center items-center h-full">
            <img
              src={imageUrl || documentUrl}
              alt={document.name}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setLoading(false)}
              onError={(e) => {
                console.error('❌ Failed to load image:', imageUrl || documentUrl);
                setError('Failed to load image. The file may be corrupted or inaccessible.');
                setLoading(false);
              }}
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              src={pdfUrl || documentUrl}
              title={document.name}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
              onError={() => {
                setError('Failed to load PDF document');
                setLoading(false);
              }}
            />
          </div>
        );

      case 'text':
        return (
          <div className="h-full overflow-auto">
            <pre className="whitespace-pre-wrap p-4 font-mono text-sm bg-gray-50 rounded-lg h-full">
              {textContent || 'No text content available'}
            </pre>
          </div>
        );

      case 'office':
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-lg font-semibold mb-2">Office Document</p>
            <p className="text-gray-600 mb-4">
              Office documents are best viewed by downloading.
            </p>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download Document
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-lg font-semibold mb-2">Unknown File Type</p>
            <p className="text-gray-600 mb-4">
              This file type cannot be previewed in the browser.
            </p>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download File
            </button>
          </div>
        );
    }
  };

  // Get document type for display
  const getDocumentType = () => {
    const fileName = document?.name || '';
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const typeMap = {
      'pdf': 'PDF Document',
      'jpg': 'JPEG Image', 
      'jpeg': 'JPEG Image',
      'png': 'PNG Image',
      'gif': 'GIF Image',
      'txt': 'Text File',
      'doc': 'Word Document',
      'docx': 'Word Document',
      'xls': 'Excel Spreadsheet',
      'xlsx': 'Excel Spreadsheet',
      'ppt': 'PowerPoint Presentation',
      'pptx': 'PowerPoint Presentation'
    };
    
    return typeMap[extension] || `${extension?.toUpperCase()} File` || 'Document';
  };

  if (!document) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">❓</div>
          <p className="text-lg mb-4">No Document Selected</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 truncate">
              {document.name || 'Untitled Document'}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-600">
                {getDocumentType()}
              </span>
              {isLocalFile && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Local File
                </span>
              )}
              {document.base64_data && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Base64
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            {/* Print button for PDFs */}
            {fileType === 'pdf' && viewMode === 'preview' && (
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center"
              >
                <span className="mr-2">🖨️</span>
                Print
              </button>
            )}
            
            {/* Download button */}
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <span className="mr-2">⬇️</span>
              Download
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div className="bg-white rounded-lg shadow-sm h-full">
            {renderDocumentContent()}
          </div>
        </div>

        {/* Footer with document info */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <span className="font-semibold text-gray-700">File Name:</span>
              <div className="truncate text-gray-900">{document.name || 'N/A'}</div>
            </div>
            
            <div className="space-y-1">
              <span className="font-semibold text-gray-700">File Type:</span>
              <div className="text-gray-900">{getDocumentType()}</div>
            </div>
            
            {document.file_size && (
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">File Size:</span>
                <div className="text-gray-900">{formatFileSize(document.file_size)}</div>
              </div>
            )}
            
            {document.upload_date && (
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Upload Date:</span>
                <div className="text-gray-900">{formatDate(document.upload_date)}</div>
              </div>
            )}
          </div>
          
          {/* Additional info for Base64 files */}
          {document.base64_data && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-semibold">Base64 Data:</span>
                <span className="text-sm text-blue-700">
                  {document.base64_data.length} characters
                </span>
              </div>
            </div>
          )}
          
          {/* Local file warning */}
          {isLocalFile && (
            <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-2">
                <span className="text-orange-600">⚠️</span>
                <div className="text-sm text-orange-700">
                  <p className="font-semibold">Local Device File</p>
                  <p>This file is stored on your mobile device and may not be directly accessible from the browser. Use the download button to access it.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format file size
function formatFileSize(bytes) {
  if (!bytes) return 'Unknown';
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'Invalid Date';
  }
}

export default DocumentViewer;
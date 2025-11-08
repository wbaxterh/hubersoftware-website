"use client"

import { useState, useCallback } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, X, Download, AlertCircle, CheckCircle, ArrowUpDown } from "lucide-react";

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
}

export default function PDFMergerPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("HuberSoftware");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'checking' | 'healthy' | 'error'>('unknown');

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleFiles = useCallback((fileList: FileList) => {
    const supportedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'image/webp'
    ];

    Array.from(fileList).forEach(file => {
      if (supportedTypes.includes(file.type)) {
        const fileItem: FileItem = {
          id: generateId(),
          file,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type
        };
        setFiles(prev => [...prev, fileItem]);
      }
    });
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();

      // Add files to FormData - the Flask API expects 'files' field
      files.forEach((fileItem) => {
        formData.append('files', fileItem.file);
      });

      // Add metadata
      formData.append('title', title || 'Merged Document');
      formData.append('author', author);
      formData.append('pageSize', 'fit'); // Default page size
      formData.append('compress', 'false'); // Default compression

      // Make API call to backend (Lambda or local Flask)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002';
      const isLocalhost = apiUrl.includes('localhost');
      const mergeEndpoint = isLocalhost ? '/api/merge' : '/merge';

      const response = await fetch(`${apiUrl}${mergeEndpoint}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Get the PDF blob from response
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      } else {
        // Handle error response
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to merge PDFs');
      }

    } catch (error) {
      console.error('Merge failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to merge files: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setFiles([]);
    setTitle("");
    setAuthor("HuberSoftware");
    setDownloadUrl(null);
    if (downloadUrl) {
      window.URL.revokeObjectURL(downloadUrl);
    }
  };

  const testApiConnection = async () => {
    setApiStatus('checking');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002';
      const isLocalhost = apiUrl.includes('localhost');
      const healthEndpoint = isLocalhost ? '/api/health' : '/health';

      const response = await fetch(`${apiUrl}${healthEndpoint}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Health Check:', data);
        setApiStatus('healthy');
      } else {
        setApiStatus('error');
      }
    } catch (error) {
      console.error('API Health Check failed:', error);
      setApiStatus('error');
    }
  };

  if (downloadUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">PDF Merged Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your PDF has been created and is ready for download.
          </p>
          <div className="space-y-3">
            <a
              href={downloadUrl}
              download={`${title || 'merged-document'}.pdf`}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download PDF
            </a>
            <Button onClick={resetTool} variant="outline" className="w-full">
              Merge Another PDF
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF <span className="text-red-600">Merger</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combine multiple PDF files and images into a single PDF document.
            High-quality processing powered by our secure cloud API.
          </p>

          {/* API Status Indicator */}
          <div className="flex items-center justify-center mt-4 space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              apiStatus === 'healthy' ? 'bg-green-500' :
              apiStatus === 'checking' ? 'bg-yellow-500 animate-pulse' :
              apiStatus === 'error' ? 'bg-red-500' : 'bg-gray-300'
            }`}></div>
            <span className="text-sm text-gray-600">
              {apiStatus === 'healthy' ? 'API Connected' :
               apiStatus === 'checking' ? 'Checking API...' :
               apiStatus === 'error' ? 'API Error' : 'API Status Unknown'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={testApiConnection}
              disabled={apiStatus === 'checking'}
            >
              Test Connection
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div
            className={`
              border-3 border-dashed rounded-xl p-16 text-center cursor-pointer
              transition-all duration-300 hover:border-blue-500 hover:bg-blue-50
              ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Drag & Drop Files Here</h3>
            <p className="text-gray-600 mb-4">
              Support: PDF, PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all">
              Choose Files
            </Button>
          </div>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.gif,.bmp,.tiff,.webp"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Files to Merge ({files.length})
            </h3>
            <div className="space-y-3 mb-6">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center flex-1">
                    <FileText className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveFile(index, index - 1)}
                        className="h-8 w-8"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Merged Document"
                  />
                </div>
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <Input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="HuberSoftware"
                  />
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <strong>Privacy & Security:</strong> Files are processed securely and temporarily.
                    No files are permanently stored - all data is deleted immediately after processing.
                  </div>
                </div>
              </div>

              {/* Merge Button */}
              <Button
                onClick={handleMerge}
                disabled={files.length === 0 || isProcessing}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 hover:shadow-lg transition-all"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Merging PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Merge PDF ({files.length} files)
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">Merge unlimited PDFs and images</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">Drag and drop interface</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">No file size limitations</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">100% secure and private</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">High-quality output</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">Completely free to use</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
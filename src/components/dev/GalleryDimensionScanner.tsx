import { useState, useEffect, useCallback } from 'react';
import { useGallery, resolveGalleryUrl } from '@/hooks/useGallery';
import type { GalleryItem } from '@/hooks/useGallery';

interface ImageDimensions {
  id: string;
  filename: string;
  width: number;
  height: number;
  isPortrait: boolean;
  currentAspectRatio?: string;
}

/**
 * DEV UTILITY: Scans all gallery images and reports their actual dimensions.
 * Use this to identify portrait images that need aspectRatio: "portrait" in gallery.json
 * 
 * Navigate to /dev/scan-gallery to use this tool.
 */
export function GalleryDimensionScanner() {
  const { items, isLoading, error } = useGallery();
  const [scannedImages, setScannedImages] = useState<ImageDimensions[]>([]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [scanComplete, setScanComplete] = useState(false);

  const imageItems = items.filter((item): item is GalleryItem & { type: 'image'; filename: string } => 
    item.type === 'image'
  );

  const scanImages = useCallback(async () => {
    if (imageItems.length === 0) return;
    
    setScanning(true);
    setScanComplete(false);
    setScannedImages([]);
    setProgress({ current: 0, total: imageItems.length });

    const results: ImageDimensions[] = [];

    for (let i = 0; i < imageItems.length; i++) {
      const item = imageItems[i];
      const url = resolveGalleryUrl(item.filename);

      try {
        const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.onerror = () => reject(new Error(`Failed to load: ${url}`));
          img.src = url;
        });

        results.push({
          id: item.id,
          filename: item.filename,
          width: dimensions.width,
          height: dimensions.height,
          isPortrait: dimensions.height > dimensions.width,
          currentAspectRatio: item.aspectRatio,
        });
      } catch (err) {
        console.error(`Error scanning ${item.filename}:`, err);
        results.push({
          id: item.id,
          filename: item.filename,
          width: 0,
          height: 0,
          isPortrait: false,
          currentAspectRatio: item.aspectRatio,
        });
      }

      setProgress({ current: i + 1, total: imageItems.length });
    }

    setScannedImages(results);
    setScanning(false);
    setScanComplete(true);
    
    // Log results to console for easy extraction
    const portraitIds = results.filter(r => r.isPortrait).map(r => r.id);
    console.log('=== PORTRAIT IMAGE IDS ===');
    console.log(JSON.stringify(portraitIds));
    console.log('=== END PORTRAIT IDS ===');
  }, [imageItems]);

  // Auto-start scanning when items are loaded
  useEffect(() => {
    if (!isLoading && !error && imageItems.length > 0 && !scanning && !scanComplete) {
      scanImages();
    }
  }, [isLoading, error, imageItems.length, scanning, scanComplete, scanImages]);

  const portraitImages = scannedImages.filter(img => img.isPortrait);
  const needsUpdate = portraitImages.filter(img => img.currentAspectRatio !== 'portrait');

  // Generate list of IDs that need updating (for data extraction)
  const generateIdList = () => {
    return needsUpdate.map(img => img.id).join('\n');
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p>Loading gallery data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error loading gallery: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gallery Dimension Scanner</h1>
      <p className="text-muted-foreground mb-6">
        This utility scans all gallery images to detect portrait orientation (height &gt; width).
        Use the output to update gallery.json with correct aspectRatio values.
      </p>

      <div className="mb-6 p-4 bg-muted rounded-lg" id="scan-stats">
        <p><strong>Total images:</strong> {imageItems.length}</p>
        {scanComplete && (
          <>
            <p><strong>Portrait images found:</strong> {portraitImages.length}</p>
            <p><strong>Need aspectRatio update:</strong> {needsUpdate.length}</p>
          </>
        )}
      </div>

      {scanning && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
            <span>Scanning images... {progress.current} / {progress.total}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {scanComplete && needsUpdate.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Images needing aspectRatio: "portrait"</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Copy these IDs and update gallery.json
            </p>
            
            <div>
              <h3 className="font-medium mb-2">IDs List ({needsUpdate.length})</h3>
              <textarea
                id="portrait-ids"
                readOnly
                value={generateIdList()}
                className="w-full h-64 p-3 font-mono text-xs bg-muted border rounded"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Portrait Images Preview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {needsUpdate.slice(0, 24).map(img => (
                <div key={img.id} className="text-center">
                  <img 
                    src={resolveGalleryUrl(img.filename)} 
                    alt={img.id}
                    className="w-full h-32 object-cover rounded border"
                  />
                  <p className="text-xs mt-1 truncate" title={img.id}>{img.id}</p>
                  <p className="text-xs text-muted-foreground">{img.width}×{img.height}</p>
                </div>
              ))}
            </div>
            {needsUpdate.length > 24 && (
              <p className="text-sm text-muted-foreground mt-2">
                ...and {needsUpdate.length - 24} more
              </p>
            )}
          </div>
        </div>
      )}

      {scanComplete && needsUpdate.length === 0 && (
        <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-700 dark:text-green-300">
            ✓ All portrait images already have correct aspectRatio values!
          </p>
        </div>
      )}
    </div>
  );
}

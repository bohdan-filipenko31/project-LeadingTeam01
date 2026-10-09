import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
<<<<<<< HEAD
import sharp from 'sharp';
import { optimize } from 'svgo';

function optimizeImages() {
  return {
    name: 'optimize-images',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      await Promise.all(
        Object.values(bundle).map(async asset => {
          if (asset.type !== 'asset' || typeof asset.fileName !== 'string') {
            return;
          }

          const extension = asset.fileName.split('.').pop()?.toLowerCase();
          if (extension === 'svg' && typeof asset.source === 'string') {
            asset.source = optimize(asset.source, {
              path: asset.fileName,
              multipass: true,
            }).data;
            return;
          }

          if (!['png', 'jpg', 'jpeg', 'webp'].includes(extension)) {
            return;
          }

          const input = Buffer.isBuffer(asset.source)
            ? asset.source
            : Buffer.from(asset.source);
          let image = sharp(input);

          if (extension === 'png') {
            image = image.png({ compressionLevel: 9, effort: 10 });
          } else if (extension === 'webp') {
            image = image.webp({ quality: 82, effort: 6 });
          } else {
            image = image.jpeg({ quality: 82, mozjpeg: true });
          }

          asset.source = await image.toBuffer();
        })
      );
    },
  };
}
=======
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
>>>>>>> 4acf8c9669aee7082503fbe813e9b84ba11215d1

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
<<<<<<< HEAD
      optimizeImages(),
=======
      ViteImageOptimizer({
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        jpg: {
          quality: 80,
        },
        svg: {
          multipass: true,
          plugins: [
            'preset-default',
            'sortAttrs',
          ],
        },
      }),
>>>>>>> 4acf8c9669aee7082503fbe813e9b84ba11215d1
    ],
  };
});

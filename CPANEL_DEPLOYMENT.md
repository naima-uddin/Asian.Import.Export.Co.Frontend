# cPanel Deployment Guide

## Steps to Deploy on cPanel

### Step 1: Build the Project

```bash
npm run build
```

This creates an `out` folder with all static files.

### Step 2: Prepare Files for Upload

The `out` folder contains everything you need. Inside it you'll find:

- `index.html`
- `_next/` folder (JavaScript, CSS, and other assets)
- All your page HTML files
- `.htaccess` file (for routing)
- Other static assets

### Step 3: Upload to cPanel

#### Option A: File Manager (Recommended for first time)

1. Log in to your cPanel
2. Open **File Manager**
3. Navigate to `public_html` (or your domain's document root)
4. **Delete all existing files** in `public_html` (if it's a fresh install)
5. Go into the `out` folder on your computer
6. **Select ALL files and folders** inside the `out` folder
7. Upload them to `public_html`
8. Make sure `.htaccess` is uploaded (enable "Show Hidden Files" in File Manager settings if you don't see it)

#### Option B: FTP (Faster for large files)

1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your cPanel using FTP credentials
3. Navigate to `public_html`
4. Upload ALL contents from the `out` folder
5. Ensure `.htaccess` is uploaded

### Step 4: Verify Upload

Make sure these files/folders are in your `public_html`:

```
public_html/
├── index.html
├── .htaccess
├── _next/
│   ├── static/
│   └── ...
├── product/
├── products/
├── categories.json
├── sitemap.xml
└── ... (other files)
```

### Step 5: Set Permissions (if needed)

In cPanel File Manager:

- Files: 644
- Folders: 755
- `.htaccess`: 644

### Step 6: Test Your Site

Visit your domain and test:

1. ✅ Homepage loads
2. ✅ Click on "See Details" - should navigate to product page
3. ✅ Search for products - results should be clickable
4. ✅ Type a product URL directly (e.g., `yourdomain.com/product/123`)
5. ✅ Navigate categories
6. ✅ Add to cart and checkout
7. ✅ Refresh page on any route - should not show 404

## Troubleshooting

### Issue: 404 on product pages

**Solution**:

- Verify `.htaccess` is uploaded to `public_html`
- Check if mod_rewrite is enabled in cPanel (ask your host)
- Ensure file permissions are correct

### Issue: Images not loading

**Solution**:

- Check that the `assets` folder is uploaded
- Verify image paths in categories.json are correct

### Issue: Blank page or errors

**Solution**:

- Check browser console for errors (F12)
- Verify all files from `out` folder are uploaded
- Clear browser cache (Ctrl+Shift+R)

### Issue: .htaccess not working

**Solution**:
Contact your hosting provider to enable:

- mod_rewrite
- AllowOverride All

## Important Notes

1. **Always upload contents OF the `out` folder, not the `out` folder itself**

   - ❌ Wrong: `public_html/out/index.html`
   - ✅ Correct: `public_html/index.html`

2. **The `.htaccess` file is crucial** - it handles routing for your single-page application

3. **Enable "Show Hidden Files"** in cPanel File Manager to see `.htaccess`

4. **Clear cache** after deploying - both browser and any cPanel caching

5. **If updating**: Delete old files first to avoid conflicts

## Build Commands Reference

```bash
# Clean previous build
Remove-Item -Recurse -Force .next, out -ErrorAction SilentlyContinue

# Fresh build
npm run build

# The 'out' folder is now ready for upload
```

## Performance Tips for cPanel

1. **Enable Gzip Compression**: The `.htaccess` already includes this
2. **Enable Browser Caching**: Already configured in `.htaccess`
3. **Use Cloudflare**: Free CDN that works great with cPanel
4. **Enable PHP OPcache**: If your hosting has it (not needed for static site, but good for overall performance)

## File Structure After Upload

Your `public_html` should look like this:

```
/public_html
  /index.html          (homepage)
  /.htaccess           (routing rules)
  /_next/              (Next.js assets)
  /product/            (pre-generated product pages)
  /products/           (category pages)
  /checkout/
  /contact/
  /aboutUs/
  /assets/             (images)
  /categories.json
  /sitemap.xml
  ... etc
```

## Re-deployment (Updates)

When you make changes and need to update:

1. Build fresh: `npm run build`
2. In cPanel File Manager:
   - Select all files in `public_html`
   - Delete them
   - Upload new files from `out` folder
3. Clear browser cache
4. Test the changes

## Quick Checklist

- [ ] Run `npm run build`
- [ ] Delete old files from `public_html`
- [ ] Upload ALL contents from `out` folder to `public_html`
- [ ] Verify `.htaccess` is present
- [ ] Check file permissions (644 for files, 755 for folders)
- [ ] Test homepage
- [ ] Test product detail pages
- [ ] Test search functionality
- [ ] Test direct URL access
- [ ] Clear browser cache and retest

## Support

If you encounter issues:

1. Check browser console (F12 → Console tab)
2. Check cPanel error logs
3. Verify `.htaccess` syntax
4. Contact your hosting provider about mod_rewrite support

# Fonts for PDF Generation

This directory contains fonts required for PDF generation with Chinese text support.

## Required Fonts

To generate PDFs with proper Chinese text rendering, you need to download the following fonts:

### 1. Source Han Serif SC (思源宋体)
- **Download**: [Adobe Source Han Serif](https://github.com/adobe-fonts/source-han-serif/releases)
- **File**: `SourceHanSerifSC-Regular.otf`
- **Direct link**: https://raw.githubusercontent.com/adobe-fonts/source-han-serif/release/OTF/SimplifiedChinese/SourceHanSerifSC-Regular.otf

### 2. PingFang SC (苹方字体) - Alternative
- **Source**: System font (macOS only)
- **File**: `PingFang.ttc`

## Installation

### For Local Development

```bash
# Download Source Han Serif SC
curl -L -o "fonts/SourceHanSerifSC-Regular.otf" "https://raw.githubusercontent.com/adobe-fonts/source-han-serif/release/OTF/SimplifiedChinese/SourceHanSerifSC-Regular.otf"

# Or copy from system (macOS)
cp "/System/Library/Fonts/PingFang.ttc" "fonts/"
```

### For Docker Deployment

The `Dockerfile.pandoc` automatically installs fonts using the `install-fonts.sh` script.

## Font Configuration

The fonts are configured in `/src/app/api/generate-pdf/route.ts`:

- **Main Font**: Times New Roman (English text)
- **CJK Font**: Source Han Serif SC (Chinese text)
- **Mono Font**: Source Code Pro (code blocks)

## License

- **Source Han Serif**: SIL Open Font License 1.1
- **PingFang**: Apple System Font (use with caution for redistribution)

Note: Large font files (*.ttc, *.otf, *.ttf) are excluded from git repository for size reasons.
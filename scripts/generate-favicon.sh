#!/bin/bash

# Default values
COLOR="#000000"
INPUT_SVG=""
OUTPUT_ICO="public/favicon.ico"
TEMP_SVG="public/favicon.temp.svg"

# Help message
show_help() {
    echo "Usage: $0 -i input.svg [-c color]"
    echo "Generate favicon.ico from SVG with specified color"
    echo ""
    echo "Options:"
    echo "  -i    Input SVG file (required)"
    echo "  -c    Color in hex format (default: #333333)"
    echo "  -h    Show this help message"
}

# Parse command line arguments
while getopts "c:i:h" opt; do
    case $opt in
        c) COLOR="$OPTARG";;
        i) INPUT_SVG="$OPTARG";;
        h) show_help; exit 0;;
        ?) show_help; exit 1;;
    esac
done

# Check if input file is provided
if [ -z "$INPUT_SVG" ]; then
    echo "Error: Input SVG file is required"
    show_help
    exit 1
fi

# Check if input file exists
if [ ! -f "$INPUT_SVG" ]; then
    echo "Error: Input file $INPUT_SVG does not exist"
    exit 1
fi

# Check if public directory exists
if [ ! -d "public" ]; then
    echo "Error: public directory does not exist"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed"
    echo "Please install it with: brew install imagemagick"
    exit 1
fi

# Create temporary SVG with specified color
sed "s/currentColor/$COLOR/g" "$INPUT_SVG" > "$TEMP_SVG"

# Generate favicon
convert -density 300 "$TEMP_SVG" -define icon:auto-resize=16,32,48 "$OUTPUT_ICO"

# Clean up
rm "$TEMP_SVG"

echo "Successfully generated $OUTPUT_ICO with color $COLOR"

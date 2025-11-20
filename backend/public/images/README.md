# Lesson Images

This directory contains images for lessons.

## Image Files:
- `math.jpg` - Math lesson icon/image
- `english.jpg` - English lesson icon/image
- `music.jpg` - Music lesson icon/image
- `art.jpg` - Art lesson icon/image
- `science.jpg` - Science lesson icon/image
- `history.jpg` - History lesson icon/image
- `geography.jpg` - Geography lesson icon/image
- `sports.jpg` - Sports lesson icon/image

## Usage:
Images are served via the static file middleware at:
`http://localhost:3000/images/filename.jpg`

## Testing:
- Existing image: `http://localhost:3000/images/math.jpg`
- Non-existent image: `http://localhost:3000/images/notfound.jpg` (returns 404 error)

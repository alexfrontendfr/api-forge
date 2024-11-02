# API Forge

Modern API testing tool with response formatting, schema validation, and mock API generation.

## Quick Setup Guide

### 1. Local Development

```bash
# Clone repository
git clone https://github.com/alexfrontendfr/api-forge.git

# Go to project folder
cd api-forge

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Deploy to GitHub Pages

```bash
# 1. Create new repository on GitHub named 'api-forge'

# 2. Initialize git locally
git init

# 3. Add all files
git add .

# 4. Commit files
git commit -m "Initial commit"

# 5. Add remote repository
git remote add origin https://github.com/alexfrontendfr/api-forge.git

# 6. Push to GitHub
git push -u origin main

# 7. Deploy to GitHub Pages
npm run deploy
```

Your site will be live at: `https://[your-github-username].github.io/api-forge`

## Features

- Test API endpoints with custom headers and request bodies
- Format and validate JSON responses
- Generate mock APIs
- Compare API responses
- Export responses in multiple formats

## Testing Examples

### Test Public API

```
URL: https://jsonplaceholder.typicode.com/posts/1
Method: GET
```

### Test with Headers

```
URL: https://api.github.com/user
Method: GET
Headers:
  Authorization: Bearer YOUR_GITHUB_TOKEN
```

## Contact

- GitHub: [@alexfrontendfr](https://github.com/alexfrontendfr)
- LinkedIn: [Alex Iulian](https://www.linkedin.com/in/alex-iulian-dev/)

## License

MIT License - feel free to use this project for your portfolio!

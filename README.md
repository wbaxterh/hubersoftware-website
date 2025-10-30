# HuberSoftware Website

A modern, professional website for HuberSoftware built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

HuberSoftware provides professional software development services including:
- Full-stack web development
- Mobile app development (iOS & Android)
- Blockchain development (Web3, DeFi, NFTs)
- Technical consulting and product management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Deployment**: AWS Amplify
- **Backend**: Python/Flask microservice for PDF tools

## Features

- 📱 Fully responsive design
- ⚡ Fast loading with Next.js optimization
- 🎨 Modern, monochromatic design
- 🔧 Professional PDF merger tool
- 📝 Contact form with service selection
- 🚀 SEO optimized
- ♿ Accessibility compliant

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd hubersoftware-website
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── about/          # About page
│   ├── services/       # Services page
│   ├── tools/          # Tools section
│   ├── contact/        # Contact page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # Reusable components
│   ├── ui/            # Shadcn/ui components
│   └── layout/        # Layout components
└── lib/               # Utilities
```

## Deployment

### Environment Variables

For production deployment, set the following environment variables:

```bash
NEXT_PUBLIC_PDF_API_URL=https://your-api-gateway-url
NEXT_PUBLIC_SITE_URL=https://hubersoftware.com
```

### AWS Amplify Deployment

1. Connect your GitHub repository to AWS Amplify
2. Configure build settings (Next.js preset)
3. Set environment variables in Amplify console
4. Deploy!

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## PDF Merger Tool

The website includes a professional PDF merger tool that:
- Combines multiple PDFs and images
- Maintains high quality output
- Provides drag & drop interface
- Processes files securely
- Integrates with Python/Flask backend

### Backend Integration

The PDF merger connects to a separate Flask microservice:
- **Repository**: [PDF Merger API](../pdfmergetool)
- **Deployment**: AWS Lambda or ECS
- **API**: RESTful endpoints with CORS enabled

## Contact

- **Website**: https://hubersoftware.com
- **Email**: hello@hubersoftware.com
- **Founded**: By Wes Huber, Software Engineer & Product Manager

## License

© 2024 HuberSoftware. All rights reserved.
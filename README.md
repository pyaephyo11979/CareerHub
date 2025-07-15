# CareerHub

[![Netlify Status](https://api.netlify.com/api/v1/badges/26ac0648-368e-4eb9-95d9-7b25f605304a/deploy-status)](https://app.netlify.com/sites/car33rhub/deploys)

A modern job portal application built with React and Vite that connects job seekers with employers. CareerHub provides a comprehensive platform for career management with role-based access, responsive design, and intuitive user experience.

## Features

### For Job Seekers

- Browse and search job listings
- Create and manage personal profiles
- Upload CV and showcase skills
- Apply to job postings
- Dark/light theme toggle

### For Employers

- Post and manage job listings
- View candidate profiles
- Edit job postings
- Company profile management

### General Features

- User authentication and authorization
- Responsive mobile-first design
- Real-time job data fetching
- Form validation and error handling
- Global messaging system
- Internationalization support (English/Myanmar)

## Tech Stack

- **Frontend**: React 18.3.1 with JSX
- **Build Tool**: Vite 6.0.1
- **UI Framework**: Material-UI (MUI) 6.4.0
- **Routing**: React Router DOM 6.21.0
- **State Management**: React Context API
- **Styling**: Emotion + Material-UI theming
- **Validation**: Superstruct
- **Fonts**: Roboto via @fontsource

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd careerhub
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route-specific page components
├── ctx/           # React Context providers
├── store/         # Custom hooks for state management
├── utils/         # Utility functions and API actions
├── assets/        # Images and static resources
├── App.jsx        # Main application component
├── Layout.jsx     # Shared layout wrapper
└── main.jsx       # Application entry point
```

## API Integration

The application integrates with a backend API hosted at `careercraftapi.onrender.com` for:

- User authentication and registration
- Job posting management
- Profile data management
- File uploads (CV, profile images)

## Deployment

The application is deployed on Netlify with automatic deployments from the main branch. The build process uses Vite's optimized production build.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

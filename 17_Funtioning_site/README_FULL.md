# 17_Funtioning_site

A full-stack blogging and content management application built with React, Redux, Vite, Appwrite, and Tailwind CSS. This project demonstrates building a functional web application with user authentication, content creation, and rich text editing capabilities.

## 📋 Overview

This project is a complete blogging platform that allows users to:
- Create, read, update, and delete (CRUD) blog posts
- Manage featured images for posts
- Switch between active and inactive post statuses
- Edit content using a rich text editor (TinyMCE)
- Authenticate securely with email and password
- Store data and files in the cloud using Appwrite backend

## 🏗️ Project Architecture

### Frontend
- **React 19.2.0** - UI library with modern hooks
- **Vite 7.3.1** - Lightning-fast build tool and dev server
- **React Router DOM** - Client-side routing for multi-page navigation
- **Redux Toolkit** - State management for authentication and app state
- **React Hook Form** - Efficient form state management
- **Tailwind CSS** - Utility-first CSS framework for styling

### Backend Services
- **Appwrite** - Open-source backend-as-a-service platform
  - User authentication
  - Database (collections and documents)
  - File storage (bucket for images)

### Rich Text Editing
- **TinyMCE** - Powerful WYSIWYG editor for content creation

## 📦 Key Dependencies

```json
{
  "@reduxjs/toolkit": "^2.11.2",
  "@tailwindcss/vite": "^4.1.18",
  "@tinymce/tinymce-react": "^6.3.0",
  "appwrite": "^22.0.0",
  "html-react-parser": "^5.2.17",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.71.1",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.13.0",
  "tailwind": "^4.0.0"
}
```

## 📁 Project Structure

```
17_Funtioning_site/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── RTE.jsx         # Rich Text Editor wrapper
│   │   ├── Signup.jsx      # User signup form
│   │   ├── PostForm.jsx    # Blog post creation/editing form
│   │   └── index.js        # Component exports
│   ├── pages/              # Page components
│   │   └── Signup.jsx      # Signup page
│   ├── appWrite/           # Appwrite services
│   │   ├── auth.js         # Authentication service
│   │   └── config.js       # Database and file operations
│   ├── conf/               # Configuration
│   │   └── conf.js         # Environment variables
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   ├── App.css             # App styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Appwrite account and server setup
- TinyMCE API key

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd 17_Funtioning_site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root with the following variables:
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINY_MCE_API_KEY=your_tinymce_api_key
   ```

### Running the Application

- **Development server:**
  ```bash
  npm run dev
  ```
  Opens at `http://localhost:5173`

- **Build for production:**
  ```bash
  npm run build
  ```

- **Preview production build:**
  ```bash
  npm run preview
  ```

- **Run ESLint:**
  ```bash
  npm run lint
  ```

## 🔑 Key Features

### 1. User Authentication
- Sign up with email and password
- Login functionality
- Secure session management with Appwrite
- User profile management
- Protected routes for authenticated users

### 2. Post Management
- **Create Posts**: Write blog posts with rich text editor
- **Edit Posts**: Update existing posts and featured images
- **Delete Posts**: Remove posts from the database
- **Status Control**: Toggle between active/inactive posts
- **Featured Images**: Upload and manage post cover images
- **Auto Slug Generation**: Automatic URL-friendly slug generation from title

### 3. Rich Text Editor
- TinyMCE integration for professional content editing
- Formatting options: bold, italic, underline, strikethrough
- Lists, tables, media embedding
- Code samples and emoticons
- Spell checker and accessibility tools
- Character count and word count

### 4. State Management
- Redux Toolkit for centralized state
- Redux for auth state (user data, login status)
- Local component state with React hooks

### 5. Responsive Design
- Tailwind CSS utility classes
- Mobile-friendly layout
- Responsive grid system (2/3 - 1/3 split for post form)

## 🔄 Core Components

### RTE Component
```jsx
<RTE 
  name="content"
  control={control}
  label="Content:"
  defaultValue={post?.content || ""}
/>
```
A wrapper around TinyMCE editor integrated with React Hook Form for form state management.

### PostForm Component
Handles creation and editing of blog posts with:
- Title input
- Auto-generated slug
- Rich text content editor
- Featured image upload
- Status selection (active/inactive)
- Submit/Update button

### Auth Service
- `createAccount(email, password, name)` - Register new user
- `login(email, password)` - User login
- `getCurrentUser()` - Fetch current user info
- `logout()` - User logout

## 🌐 API Integration

The application uses Appwrite for:
- **User Management**: Authentication and user accounts
- **Database**: Storing blog posts with metadata
- **Storage**: Hosting featured images and media files

## 🛠️ Configuration

Environment variables are loaded in [conf.js](src/conf/conf.js):
```javascript
const conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDataBaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteColectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinyMCEAPIKey: String(import.meta.env.VITE_TINY_MCE_API_KEY),
};
```

## 📚 Learning Outcomes

This project teaches:
- Building React applications with modern patterns
- Server-side state management with Redux
- Form handling with React Hook Form
- Backend integration with Appwrite
- Component composition and reusability
- Rich text editor integration
- File upload and management
- URL routing and navigation
- Tailwind CSS styling
- Environment variable management

## 🤝 Contributing

Feel free to fork, modify, and extend this project for your learning or production use.

## 📄 License

This project is part of the React 2026 learning series.

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Appwrite Documentation](https://appwrite.io/docs)
- [TinyMCE Docs](https://www.tiny.cloud/docs/)
- [React Hook Form](https://react-hook-form.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated:** April 2, 2026

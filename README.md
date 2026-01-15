# Admin Dashboard

A modern, beautiful, and fully-featured admin dashboard built with React.js and Tailwind CSS.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- 📊 **Interactive Charts** - Multiple chart types using Recharts (Line, Bar, Pie, Area, Radar)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🧭 **Multiple Pages** - Dashboard, Users, Products, Orders, Analytics, and Settings
- 🔍 **Search & Filter** - Advanced search and filtering capabilities
- 📈 **Real-time Stats** - Dynamic statistics cards with growth indicators
- 🎯 **Sample Data** - Pre-populated with realistic sample data
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## Technology Stack

- **React.js** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library
- **Vite** - Next-generation frontend tooling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "C:\Users\dadas\Desktop\Admin Dashboard"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Admin Dashboard/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── MainLayout.jsx
│   │       ├── Sidebar.jsx
│   │       └── Header.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   ├── data/
│   │   └── sampleData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Pages Overview

### Dashboard
- Overview statistics cards
- Sales trend charts (Area, Line, Bar charts)
- Real-time metrics with growth indicators

### Users
- User management table
- Search and filter functionality
- Role and status badges
- User actions (Edit, Delete)

### Products
- Product inventory grid
- Stock status indicators
- Category filtering
- Product statistics

### Orders
- Order management table
- Order status tracking
- Revenue statistics
- Export functionality

### Analytics
- Revenue distribution (Pie chart)
- Category performance (Radar chart)
- Sales trend analysis
- User growth charts

### Settings
- Profile settings
- Notification preferences
- Security settings
- Appearance customization

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Sample Data

Modify `src/data/sampleData.js` to update the sample data or connect to your API.

## License

This project is open source and available for personal and commercial use.

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

Built with ❤️ using React.js and Tailwind CSS

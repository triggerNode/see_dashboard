# Changelog

All notable changes to the {s}ee Dashboard project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.3] - 2024-07-02

### Added

-   **Live DevEx Rate Support**: Automatic daily scrape of Roblox official FAQ via Supabase Edge Function (`scrapeDevexRate`).
-   **`public.devex_rates` table**: Stores historical rate snapshots for accurate back-calculations.
-   **API endpoint `/api/devex/latest`**: Serves the latest rate with 10-minute in-memory cache.
-   **React Hook `useDevexRate`** & **`EffectiveTakeHome` widget**: Surface the most up-to-date take-home rate in dashboards.
-   **CI Edge Deploy Workflow**: Automated deployment of the edge function on main branch push.
-   **Tests & Documentation**: Parser unit test, integration test for API route, metric documentation, and architecture diagram update.

## [1.3.2] - 2024-12-19

### 🎮 Major Features Added

-   **Roblox Game Development Focus**: Complete transformation to serve Roblox developers and studios
-   **Financial Intelligence Dashboard**: Advanced revenue tracking with DevEx rate calculations
-   **LiveOps Analytics**: Real-time player metrics and engagement correlation
-   **Studio Management Tools**: Project tracking and team collaboration features

### 💰 Financial Tracking Enhancements

-   **Net Profit Calculation**: Real-time profitability tracking using DevEx rates
-   **Revenue Source Breakdown**: Separate tracking for Game Pass, Dev Products, Premium Payouts
-   **Cost Management**: Manual cost entry forms for external expenses
-   **ROI Analytics**: Marketing spend tracking and ROAS calculations

### 📊 Dashboard Improvements

-   **Ecommerce Dashboard**: Renamed and enhanced for game monetization tracking
-   **Analytics Dashboard**: DAU correlation with revenue performance
-   **Project Dashboard**: Developer cost breakdown and burn rate calculations
-   **Marketing Dashboard**: Ad spend and user acquisition metrics

### 🛠️ Technical Improvements

-   **React 19 Upgrade**: Latest React features with improved performance
-   **TypeScript 5.7.2**: Enhanced type safety and developer experience
-   **Vite 6.3.5**: Faster build times and improved dev server
-   **Enhanced Component Library**: 40+ reusable UI components

### 🎨 UI/UX Enhancements

-   **New Branding**: Updated logos and color scheme for game development theme
-   **Responsive Design**: Improved mobile and tablet experience
-   **Dark/Light Themes**: Enhanced theme switching capabilities
-   **Accessibility**: Better screen reader support and keyboard navigation

### 🌐 Internationalization

-   **Multi-language Support**: English, Spanish, Arabic, and French
-   **Localized Content**: Currency formatting and date/time localization
-   **RTL Support**: Right-to-left language support for Arabic

### 📱 Component Updates

-   **Data Tables**: Enhanced filtering, sorting, and export capabilities
-   **Charts & Graphs**: New ApexCharts integration with interactive features
-   **Forms**: Improved validation and user experience
-   **Navigation**: Streamlined menu structure for game development workflow

### 🔧 Configuration & Setup

-   **Metric Mapping**: Comprehensive business logic documentation
-   **Navigation Structure**: Organized page hierarchy and routing
-   **Mock Data**: Realistic sample data for development and demos
-   **Environment Config**: Flexible configuration for different deployment scenarios

## [1.2.0] - 2024-11-15

### Added

-   Initial dashboard framework
-   Basic authentication system
-   UI component library foundation
-   Template layouts and navigation

### Changed

-   Project structure reorganization
-   Build system optimization
-   Dependencies update

## [1.1.0] - 2024-10-20

### Added

-   Core React application setup
-   TypeScript configuration
-   Tailwind CSS integration
-   Basic routing system

### Fixed

-   Build configuration issues
-   Development server setup

## [1.0.0] - 2024-10-01

### Added

-   Initial project setup
-   Basic project structure
-   Development environment configuration

---

## Upcoming Features (Roadmap)

### 🚀 Version 1.4.0 (Planned Q1 2025)

-   **API Integration**: Direct Roblox Analytics API connection
-   **Real-time Data**: Live transaction monitoring
-   **Advanced Reporting**: PDF report generation
-   **Team Permissions**: Role-based access control

### 🎯 Version 1.5.0 (Planned Q2 2025)

-   **Mobile App**: React Native companion app
-   **Advanced Analytics**: Machine learning insights
-   **Integration Hub**: Third-party tool connections
-   **White Label**: Custom branding options

---

## Contributing

For information on how to contribute to this changelog and the project, please see our [Contributing Guidelines](CONTRIBUTING.md).

## Support

If you encounter any issues or have questions about recent changes, please:

-   Check our [Documentation](https://see.triggernode.com/guide/documentation/introduction)
-   Open an [Issue](https://github.com/yourusername/see_dashboard1/issues)
-   Start a [Discussion](https://github.com/yourusername/see_dashboard1/discussions)

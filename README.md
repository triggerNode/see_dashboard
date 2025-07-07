# {s}ee - Game Development Studio Hub

![{s}ee Logo](public/img/logo/logo-dark-full.png)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-see.triggernode.com-blue?style=for-the-badge)](https://see.triggernode.com/)
[![Documentation](https://img.shields.io/badge/Documentation-Online-green?style=for-the-badge)](https://see.triggernode.com/guide/documentation/introduction)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

---

## 🎮 Overview

**{s}ee** is a specialized dashboard application designed for **Roblox game developers and studios**. Built with React 19 and TypeScript, it provides comprehensive tools for financial tracking, live operations monitoring, and studio management—helping developers transform their game data into actionable business intelligence.

Whether you're an indie developer tracking your first game's performance or managing a large studio with multiple titles, {s}ee scales with your needs and provides the financial transparency required for sustainable game development.

---

## ✨ Key Features

### 🏦 Financial Intelligence Dashboard

-   **Net Profit Tracking**: Real-time calculation of true profitability using DevEx rates
-   **Revenue Source Breakdown**: Track Game Pass, Dev Products, Premium Payouts, and direct USD revenue
-   **Cost Management**: Comprehensive tracking of development costs, marketing spend, and operational expenses
-   **ROI Analysis**: Measure Return on Ad Spend (ROAS) and marketing effectiveness

### 📊 LiveOps & Analytics

-   **Player Metrics**: Daily Active Users (DAU) correlation with revenue performance
-   **Project P&L**: Allocate shared studio costs to determine true profit per game
-   **Real-time Monitoring**: Live transaction feeds and server health monitoring
-   **Performance Analytics**: Top-performing content and engagement metrics

### 🏗️ Studio Management

-   **Project Tracking**: Scrum boards, task management, and milestone tracking
-   **Team Collaboration**: Role-based access and team workflow management
-   **Resource Planning**: Developer cost breakdown and monthly burn rate calculations
-   **Asset Cost Ledger**: Track external development costs and asset purchases

### 🛠️ Developer Experience

-   **Multi-language Support**: Built-in internationalization (English, Spanish, Arabic, French)
-   **Dark/Light Mode**: Complete theme customization
-   **Responsive Design**: Seamless experience across desktop, tablet, and mobile
-   **Component Library**: 40+ reusable UI components for custom development

---

## 🚀 Live Demo

Experience {s}ee in action: [see.triggernode.com](https://see.triggernode.com/)

### Demo Credentials

```text
Email: admin@see.com
Password: 123Qwe
```

---

## 📈 Business Value

### For Indie Developers

-   **Simple Financial Tracking**: Understand your game's true profitability
-   **Cost Awareness**: Track where your money is going with manual cost entry
-   **Growth Insights**: Correlate player engagement with revenue trends

### For Studios

-   **Multi-Project Intelligence**: Compare performance across your game portfolio
-   **Team Resource Management**: Optimize developer allocation and costs
-   **Investor Reporting**: Professional financial dashboards for stakeholders

### For Teams

-   **Collaborative Workflow**: Scrum boards and project management tools
-   **Role-Based Access**: Secure access controls for different team members
-   **Communication**: Built-in chat and notification systems

---

## 🏗️ Architecture

### Frontend Stack

-   **React 19** – Latest React features with concurrent rendering
-   **TypeScript 5.7.2** – Full type safety and developer experience
-   **Vite 6.3.5** – Lightning-fast build tool and dev server
-   **TailwindCSS 4.0** – Utility-first CSS framework
-   **Framer Motion** – Smooth animations and interactions

### Data & State Management

-   **Zustand** – Lightweight state management
-   **SWR** – Data fetching with caching and revalidation
-   **React Hook Form** – Performant form handling
-   **Zod** – Schema validation

### Visualization & UI

-   **ApexCharts** – Interactive charts and graphs
-   **D3.js** – Custom data visualizations
-   **React Table** – Powerful table components
-   **React Simple Maps** – Geographic data visualization

### Development Tools

-   **ESLint** – Code linting and quality
-   **Prettier** – Code formatting
-   **TypeScript ESLint** – TypeScript-specific linting
-   **Vite Plugin React** – React-specific optimizations

---

## ⚡ Quick Start

### Prerequisites

-   **Node.js** (version 18 or higher)
-   **npm** or **yarn**
-   **Supabase CLI** (optional, for local development)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/triggerNode/see_dashboard.git
    cd see_dashboard
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up Supabase environment**

    ```bash
    # Copy the example environment file
    cp .env.example .env.local

    # Add your Supabase credentials to .env.local
    # VITE_SUPABASE_URL=your_supabase_project_url
    # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. **Start development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**  
   Navigate to `http://localhost:5173`

### Supabase Setup

-   Run `npm run supabase:link` to connect the CLI to your project
-   For local development with Supabase, install the CLI and run `npm run supabase:start`
-   All API calls use the client in `src/lib/supabaseClient.ts`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 Key Metrics & Calculations

{s}ee implements sophisticated financial calculations specifically for Roblox developers:

### Net Profit Formula

```text
Net Profit = (Total Robux Revenue × DevEx Rate) + Direct USD Revenue
           - (Total Robux Costs × DevEx Rate) - Total USD Costs
```

### Effective Revenue Share

```text
Effective Revenue Share = (Robux Revenue After Marketplace Fee × DevEx Rate)
                        / (Gross Robux Revenue / 0.7 × Avg Purchase Price USD)
```

### Monthly Burn Rate

```text
Monthly Burn Rate = Fixed Monthly Salaries + Avg Monthly Contractor Costs
                  + Avg Monthly Software Subscriptions
```

---

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (40+ components)
│   ├── shared/         # Shared business logic components
│   ├── layouts/        # Layout components
│   └── template/       # Template-specific components
├── views/              # Page components
│   ├── dashboards/     # Dashboard pages
│   ├── concepts/       # Business logic pages
│   └── auth/           # Authentication pages
├── services/           # API services and data fetching
├── store/              # State management (Zustand)
├── utils/              # Utility functions and hooks
├── configs/            # Configuration files
└── assets/             # Static assets and styles
```

---

## 🌐 Internationalization

{s}ee supports multiple languages out of the box:

-   **English** (default)
-   **Spanish** (Español)
-   **Arabic** (العربية)
-   **French** (Français)

Add new languages by extending the `src/locales/lang/` directory.

---

## 📚 Documentation

### Development Guides

-   **[Installation Guide](https://see.triggernode.com/guide/documentation/installation)** – Detailed setup instructions
-   **[Component Documentation](https://see.triggernode.com/guide/documentation/components)** – UI component library
-   **[API Integration](https://see.triggernode.com/guide/documentation/api)** – Connect your Roblox data
-   **[Customization Guide](https://see.triggernode.com/guide/documentation/customization)** – Theming and branding

### Business Guides

-   **[Financial Tracking Setup](docs/FINANCIAL_SETUP.md)** – Configure revenue and cost tracking
-   **[Metric Configuration](docs/METRICS.md)** – Understanding and customizing metrics
-   **[Studio Management](docs/STUDIO_MANAGEMENT.md)** – Team and project management

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

-   Use TypeScript for all new code
-   Follow the existing code style (enforced by ESLint/Prettier)
-   Write tests for new features
-   Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

-   **Documentation**: [see.triggernode.com/guide/documentation](https://see.triggernode.com/guide/documentation/introduction)
-   **Issues**: [GitHub Issues](https://github.com/triggerNode/see_dashboard/issues)
-   **Discussions**: [GitHub Discussions](https://github.com/triggerNode/see_dashboard/discussions)

---

## 🙏 Acknowledgments

-   Built with love for the Roblox developer community
-   Inspired by the need for transparent financial tracking in game development
-   Special thanks to all contributors and beta testers

---

Built with ❤️ for Roblox developers by developers

[Live Demo](https://see.triggernode.com/) • [Documentation](https://see.triggernode.com/guide/documentation/introduction) • [Report Bug](https://github.com/triggerNode/see_dashboard/issues) • [Request Feature](https://github.com/triggerNode/see_dashboard/issues)

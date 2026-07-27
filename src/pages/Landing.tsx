import { Link } from 'react-router-dom';
import { CheckCircle, LayoutDashboard, Users, Zap, Shield, Globe, Rocket, Star, Award } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Project Phoenix
            </span>
          </div>          
          <div className="flex items-center gap-6">
            <a href="#overview" className="text-gray-300 hover:text-white transition-colors">
              Overview
            </a>

            <a href="#architecture" className="text-gray-300 hover:text-white transition-colors">
              Architecture
            </a>

            <a href="#tech-stack" className="text-gray-300 hover:text-white transition-colors">
              Technology Stack
            </a>

            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-full px-4 py-2 mb-6">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Production-Ready DevOps Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Project Phoenix
            </span>
            <span className="block mt-4 text-2xl md:text-3xl font-medium text-gray-300">
              Cloud-Native DevOps Engineering Portfolio
            </span>            
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              A task management platform engineered with production-grade DevOps practices.
            <span className="block mt-4">
              Built with React, Flask, PostgreSQL, Kubernetes, Terraform, Ansible,
              Argo CD, Prometheus, Grafana and secure application delivery.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3">
              <Zap className="w-5 h-5" />
              View Live Application
            </Link>
            <a 
              href="https://github.com/Bourgeoisie2024/capstone-phoenix/tree/capstone-build"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center">
              View GitHub Repository
            </a>
          </div>

          </div>   {/* closes max-w-4xl mx-auto text-center */}

          </div>   {/* closes container mx-auto px-6 py-16 md:py-24 */}

      {/* Project Overview */}
      <div id="overview" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Project Overview
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            Project Phoenix is a production-style task management platform
            designed to demonstrate modern cloud-native application delivery.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed mt-6">
            The application combines full-stack development with DevOps
            engineering practices including Infrastructure as Code,
            Kubernetes orchestration, GitOps automation, secure deployments,
            and observability.
          </p>
        </div>
      </div>   

      {/* Why This Application Matters */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            Why This Application Matters
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            Modern software teams require more than functional applications.
            They need reliable systems that can be deployed, monitored,
            scaled, and maintained efficiently.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed mt-6">
            Project Phoenix demonstrates a complete software delivery
            lifecycle — from infrastructure provisioning and application
            deployment to monitoring and continuous improvement.
          </p>

        </div>
      </div> 

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Application Capabilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Core application functionality demonstrating full-stack development, secure user management, and collaborative workflows.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">Task Management Workflow</h3>
            <p className="text-gray-400 mb-6">A collaborative Kanban-style workflow allowing users to create, organize, and track tasks through different stages of completion.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Real-time updates</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Customizable workflows</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Visual progress tracking</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">User Management & Collaboration</h3>
            <p className="text-gray-400 mb-6">Multi-user functionality with structured collaboration features and role-based access control.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Multi-user support</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Role-based permissions</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Activity tracking</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">Application Security</h3>
            <p className="text-gray-400 mb-6">Security-focused implementation using authentication mechanisms and protected application communication.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> JWT authentication</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Encrypted sessions</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Data backup</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Application Workflow</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A streamlined workflow designed for efficient task management and team collaboration.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Access the Platform</h3>
            <p className="text-gray-400">Authenticate securely and access your personalized workspace.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Manage Tasks</h3>
            <p className="text-gray-400">Create, prioritize, and organize work using the interactive Kanban workflow.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Track Progress</h3>
            <p className="text-gray-400">Monitor task movement, collaborate efficiently, and maintain workflow visibility.</p>
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div id="architecture" className="container mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            System Architecture
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto">
             A production-style cloud-native architecture designed for
             scalability, security, automation, and reliable application delivery.
          </p>
        </div>


        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8">

          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Application Layer
              </h3>

              <p className="text-gray-400">
                React Frontend
                <br />
                Flask REST API
                <br />
                PostgreSQL Database
              </p>
            </div>


            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Infrastructure Layer
              </h3>

              <p className="text-gray-400">
                Kubernetes (K3s)
              <br />
                AWS EC2
              <br />
                Terraform
              <br />
                Ansible
              </p>
            </div>


            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Delivery & Operations
              </h3>

              <p className="text-gray-400">
                Argo CD GitOps
                <br />
                Prometheus
                <br />
                Grafana
                <br />
                Secure TLS Delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div id="tech-stack" className="container mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Technology Stack
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto">
            A modern technology ecosystem combining application development,
            infrastructure automation, cloud-native deployment, and observability.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Frontend
            </h3>
            <p className="text-gray-400">
              React
              <br />
              TypeScript
              <br />
              Tailwind CSS
              <br />
              Vite
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Backend & Database
            </h3>
            <p className="text-gray-400">
              Flask API
              <br />
              Python
              <br />
              PostgreSQL
              <br />
              Database Migration
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Infrastructure
            </h3>
            <p className="text-gray-400">
              AWS EC2
              <br />
              Terraform
              <br />
              Ansible
              <br />
              Docker
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Platform & Delivery
            </h3>
            <p className="text-gray-400">
              Kubernetes (K3s)
              <br />
              Argo CD
              <br />
              GitOps
              <br />
              Helm
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Security
            </h3>
            <p className="text-gray-400">
              TLS Certificates
              <br />
              Network Policies
              <br />
              Sealed Secrets
              <br />
              Cert-Manager
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Observability
            </h3>
            <p className="text-gray-400">
              Prometheus
              <br />
              Grafana
              <br />
              Metrics Server
              <br />
              Monitoring
            </p>
          </div>
        </div>
      </div>

      {/* DevOps Pipeline Section */}
      <div id="pipeline" className="container mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            DevOps Pipeline
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto">
            A complete cloud-native delivery workflow demonstrating
            infrastructure automation, GitOps deployment, and production monitoring.
          </p>
        </div>


        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center">
            <h3 className="font-bold mb-3">
              Source Control
            </h3>

            <p className="text-gray-400">
              GitHub Repository
              <br />
              Version Control
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center">
            <h3 className="font-bold mb-3">
              Infrastructure
            </h3>

            <p className="text-gray-400">
              Terraform
              <br />
              AWS Provisioning
              <br />
              Ansible Setup
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center">
            <h3 className="font-bold mb-3">
              Deployment
            </h3>

            <p className="text-gray-400">
              Docker Images
              <br />
              Kubernetes
              <br />
              Argo CD GitOps
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center">
            <h3 className="font-bold mb-3">
              Operations
            </h3>

            <p className="text-gray-400">
              Prometheus
              <br />
              Grafana
              <br />
              Application Monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Highlights Section */}
      <div id="highlights" className="container mx-auto px-6 py-16">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Engineering Highlights
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto">
            Key engineering practices implemented to deliver a secure,
            scalable, and production-style cloud-native platform.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Infrastructure as Code
            </h3>

            <p className="text-gray-400">
              Automated AWS infrastructure provisioning using Terraform,
              including networking, security groups, and reusable modules.
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Kubernetes Orchestration
            </h3>

            <p className="text-gray-400">
              Multi-node Kubernetes deployment using K3s with scalable
              workloads, service discovery, and production-style operations.
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              GitOps Deployment
            </h3>

            <p className="text-gray-400">
              Declarative continuous delivery using Argo CD,
              enabling automated Kubernetes synchronization.
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Security Engineering
            </h3>

            <p className="text-gray-400">
              HTTPS/TLS, Network Policies, and secure secrets management
              implemented for protected application delivery.
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Scalability
            </h3>

            <p className="text-gray-400">
              Horizontal Pod Autoscaling and resource monitoring
              configured to support changing workloads.
            </p>
          </div>


          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">
              Observability
            </h3>

            <p className="text-gray-400">
              Prometheus and Grafana integration providing metrics,
              dashboards, and operational visibility.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-2xl p-8 md:p-12 border border-blue-800/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
              <p className="text-gray-300 mb-6">Explore a production-style application deployed on Kubernetes with GitOps automation.</p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Demo Credentials</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Admin Account</p>
                      <p className="text-gray-400 font-mono">admin / admin123</p>
                    </div>
                    <div>
                      <p className="font-semibold">User Account</p>
                      <p className="text-gray-400 font-mono">user / user123</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <Zap className="w-5 h-5" />
                  Launch Demo Dashboard
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">To Do</div>
                    <div className="h-2 bg-blue-500 rounded-full mb-2"></div>
                    <div className="h-2 bg-blue-400 rounded-full mb-2"></div>
                    <div className="h-2 bg-blue-300 rounded-full"></div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">In Progress</div>
                    <div className="h-2 bg-purple-500 rounded-full mb-2"></div>
                    <div className="h-2 bg-purple-400 rounded-full"></div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Done</div>
                    <div className="h-2 bg-green-500 rounded-full mb-2"></div>
                    <div className="h-2 bg-green-400 rounded-full mb-2"></div>
                    <div className="h-2 bg-green-300 rounded-full mb-2"></div>
                    <div className="h-2 bg-green-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">TeamFlow</span>
            </div>
            <p className="text-gray-400 max-w-md">
              A cloud-native platform demonstrating full-stack engineering, infrastructure automation, and DevOps delivery practices.
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="mb-4">
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">Portfolio Project</span>
              </div>

              <p className="text-gray-400">Engineered by</p>

              <p className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Al-Ameen Olawale Bakare
                </span>
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <span className="text-gray-500 text-sm">© 2026 TeamFlow. All rights reserved.</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>This project demonstrates full-stack development skills with React, TypeScript, Flask, and PostgreSQL.</p>
          <p className="mt-2">Built with passion and attention to detail.</p>
        </div>
      </footer>
    </div>
  );
}

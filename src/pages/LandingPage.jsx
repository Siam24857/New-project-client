import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, Users, Clock, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const heroTitleWords = ['Smarter', 'Faster', 'Collaborative', 'Powerful'];

  const features = [
    {
      title: 'Project Management',
      description: 'Create, organize, and track projects with powerful collaborative features and real-time updates.',
      icon: BarChart3,
    },
    {
      title: 'Task Management',
      description: 'Break down complex projects into manageable tasks with due dates, priorities, and dependencies.',
      icon: CheckCircle,
    },
    {
      title: 'Team Collaboration',
      description: 'Real-time chat, notifications, and role-based access control for seamless team collaboration.',
      icon: Users,
    },
    {
      title: 'Analytics & Insights',
      description: 'Track progress with detailed analytics, reports, and real-time performance metrics.',
      icon: BarChart3,
    },
    {
      title: 'Time Tracking',
      description: 'Monitor work hours, billable time, and productivity with comprehensive time tracking tools.',
      icon: Clock,
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with JWT authentication, role-based access, and data encryption.',
      icon: Shield,
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: 'month',
      features: [
        'Up to 5 projects',
        'Basic task management',
        'Team of 3 members',
        'Email support',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'month',
      featured: true,
      features: [
        'Unlimited projects',
        'Advanced task management',
        'Team of 50 members',
        'Priority support',
        'Analytics dashboard',
        'Custom integrations',
      ],
      cta: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      features: [
        'Unlimited everything',
        'Dedicated account manager',
        'Custom SLA',
        'On-premise deployment',
        'Advanced security',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-900" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/10" />

      <nav className="relative z-50 sticky top-0 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl">
                T
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="hidden sm:block px-6 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 mb-8 animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-300">Trusted by 1000+ developers</span>
              </div>

              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                Transform Your Workflow
                <br />
                with <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {heroTitleWords.map((word, index) => (
                    <span
                      key={word}
                      className="inline-block ml-3 animate-bounce-in"
                      style={{ animationDelay: `${500 + index * 200}ms` }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </h1>

              <p
                className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '700ms' }}
              >
                The ultimate MERN-based task management platform designed for teams that demand
                efficiency, collaboration, and seamless productivity at scale.
              </p>

              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
                style={{ animationDelay: '900ms' }}
              >
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>

              <div
                className="relative mx-auto max-w-4xl animate-fade-in-up"
                style={{ animationDelay: '1100ms' }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Interactive Dashboard Preview</h3>
                      <p className="text-slate-400">Real-time analytics and project insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" style={{ animationDelay: '1300ms' }}>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-pulse-dot">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Everything you need to manage projects and tasks efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="relative group animate-bounce-in"
                  style={{ animationDelay: `${1500 + index * 150}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-slate-800/90 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 bg-slate-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Choose the perfect plan for your team's needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${1800 + index * 200}ms` }}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className={`h-full bg-slate-900/80 backdrop-blur-xl border ${plan.featured ? 'border-blue-500/50' : 'border-white/10'} rounded-2xl p-8 ${plan.featured ? 'pt-12' : 'pt-8'}`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-8">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-slate-400">/{plan.period}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/register"
                      className={`block w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-center ${plan.featured
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/30'
                          : 'border border-white/20 hover:border-white/40 text-white hover:bg-white/10'}`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Join thousands of teams already transforming their workflow
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                View Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative bg-slate-950 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl">
                T
              </div>
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 TaskFlow. All rights reserved.
            </div>
            <div className="flex gap-8">
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
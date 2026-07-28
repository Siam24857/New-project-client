import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Clock, Shield, ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { label: 'Projects Completed', value: 1250, suffix: '+', icon: TrendingUp },
    { label: 'Happy Users', value: 500, suffix: '+', icon: Users },
    { label: 'Tasks Managed', value: 50000, suffix: '+', icon: Clock },
    { label: 'Uptime', value: 99.9, suffix: '%', icon: Shield },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-fade-in-up">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8 animate-bounce-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-dot" />
            <span className="text-sm font-medium text-slate-300">AI-Powered Task Management</span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-tight mb-8 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            Transform Your Workflow
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              With Intelligence
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
          >
            The ultimate MERN stack project management platform designed for modern teams.
            Automate repetitive tasks, collaborate seamlessly, and deliver results faster than ever.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up"
            style={{ animationDelay: '700ms' }}
          >
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsVideoPlaying(true)}
              className="flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '900ms' }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-bounce-in"
                style={{ animationDelay: `${1100 + index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-dot"
        style={{ animationDelay: '1500ms' }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {isVideoPlaying && (
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Demo Video</h3>
                <p className="text-slate-400">Video player would integrate here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-2xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-2xl"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
          }}
        />
      </div>
    </section>
  );
}

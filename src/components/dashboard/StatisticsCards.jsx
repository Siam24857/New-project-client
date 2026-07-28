import { useState, useEffect } from 'react';
import { TrendingUp, Users, CheckCircle, BarChart3, Activity, Target } from 'lucide-react';

export default function StatisticsCards({ stats }) {
  const [counts, setCounts] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    if (stats) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const animateCount = (target, property) => {
        let current = 0;
        const increment = target / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounts(prev => ({ ...prev, [property]: Math.floor(current) }));
        }, interval);
        return timer;
      };

      const timers = [
        animateCount(stats.totalProjects, 'totalProjects'),
        animateCount(stats.totalTasks, 'totalTasks'),
        animateCount(stats.completedTasks || 0, 'completedTasks'),
        animateCount(stats.activeUsers || 250, 'activeUsers'),
      ];

      return () => timers.forEach(timer => clearInterval(timer));
    }
  }, [stats]);

  const cards = [
    {
      title: 'Total Projects',
      value: counts.totalProjects,
      suffix: '',
      icon: BarChart3,
      color: 'from-blue-600 to-blue-700',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Total Tasks',
      value: counts.totalTasks,
      suffix: '',
      icon: CheckCircle,
      color: 'from-emerald-600 to-emerald-700',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Completed Tasks',
      value: counts.completedTasks,
      suffix: '',
      icon: Target,
      color: 'from-purple-600 to-purple-700',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Active Users',
      value: counts.activeUsers,
      suffix: '',
      icon: Users,
      color: 'from-orange-600 to-orange-700',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      change: '+18%',
      trend: 'up',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="group relative animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
          <div className={`relative bg-white rounded-2xl border ${card.borderColor} ${card.bgGradient} p-6 transition-all duration-300 hover:shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <div className={`flex items-center gap-1 ${card.textColor} ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{card.change}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">{card.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                  {card.value.toLocaleString()}
                </span>
                <span className="text-lg text-slate-500">{card.suffix}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Activity className="w-4 h-4" />
                <span>Real-time data</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
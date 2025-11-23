import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status?: 'normal' | 'warning' | 'error';
}

export const SensorCard = ({ title, value, unit, icon: Icon, status = 'normal' }: SensorCardProps) => {
  const statusColors = {
    normal: 'text-success',
    warning: 'text-warning',
    error: 'text-destructive',
  };

  const statusBg = {
    normal: 'bg-success/10',
    warning: 'bg-warning/10',
    error: 'bg-destructive/10',
  };

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-300 border-border/50">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${statusBg[status]}`}>
          <Icon className={`h-6 w-6 ${statusColors[status]}`} />
        </div>
      </div>
    </Card>
  );
};

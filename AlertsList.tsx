import { Card } from '@/components/ui/card';
import { Alert } from '@/types/sensor';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { format } from 'date-fns';

interface AlertsListProps {
  alerts: Alert[];
}

export const AlertsList = ({ alerts }: AlertsListProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  const getAlertBg = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'bg-destructive/10 border-destructive/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-info/10 border-info/20';
    }
  };

  if (alerts.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Info className="h-8 w-8" />
          <p>No active alerts</p>
          <p className="text-sm">All systems operating normally</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.slice(0, 5).map((alert) => (
        <Card key={alert.id} className={`p-4 ${getAlertBg(alert.type)}`}>
          <div className="flex items-start gap-3">
            {getAlertIcon(alert.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm text-foreground">{alert.sensor}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {format(alert.timestamp, 'HH:mm:ss')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

import { Card } from '@/components/ui/card';
import { Droplets, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PredictionCardProps {
  irrigationRequired: boolean;
  confidence: number;
}

export const PredictionCard = ({ irrigationRequired, confidence }: PredictionCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${irrigationRequired ? 'bg-primary' : 'bg-muted'}`}>
              <Droplets className={`h-6 w-6 ${irrigationRequired ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Irrigation Status</p>
              <p className={`text-2xl font-bold ${irrigationRequired ? 'text-primary' : 'text-foreground'}`}>
                {irrigationRequired ? 'Required' : 'Not Required'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Confidence Level
            </span>
            <span className="font-semibold text-foreground">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>

        <p className="text-xs text-muted-foreground">
          {irrigationRequired 
            ? 'System recommends irrigation based on current sensor readings.'
            : 'Current conditions are optimal. No irrigation needed at this time.'}
        </p>
      </div>
    </Card>
  );
};

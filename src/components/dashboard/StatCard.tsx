
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, className }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs mt-1">
            {isPositive && <ArrowUp className="h-3 w-3 mr-1 text-green-500" />}
            {isNegative && <ArrowDown className="h-3 w-3 mr-1 text-red-500" />}
            <span
              className={cn(
                "font-medium",
                isPositive && "text-green-500",
                isNegative && "text-red-500"
              )}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/date-utils";
import { ClaimEvent } from "@/types/claim";

interface ClaimTimelineProps {
  events: ClaimEvent[];
}

const ClaimTimeline = ({ events }: ClaimTimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-border space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="mb-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatDate(event.date, true)}
                </span>
              </div>
              <h3 className="text-sm font-medium">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              {event.user && (
                <div className="mt-2 text-xs text-muted-foreground">
                  By {event.user}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimTimeline;

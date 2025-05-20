
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "../StatusBadge";
import { formatDate } from "@/lib/date-utils";
import { Claim } from "@/types/claim";

interface ClaimInfoProps {
  claim: Claim;
}

const ClaimInfo = ({ claim }: ClaimInfoProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <CardTitle>Claim Information</CardTitle>
          <StatusBadge status={claim.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{claim.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{claim.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Policy Details</h4>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{claim.policyId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Report No.</p>
                  <p className="font-medium">{claim.reportNo}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Parties</h4>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Insurer</p>
                  <p className="font-medium">{claim.insurer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Insured</p>
                  <p className="font-medium">{claim.insured}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Surveyor</p>
                  <p className="font-medium">{claim.surveyor || 'Not Assigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{claim.assignedEmployee}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Dates</h4>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Date Filed</p>
                  <p className="font-medium">{formatDate(claim.dateFiled)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(claim.lastUpdated)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimInfo;

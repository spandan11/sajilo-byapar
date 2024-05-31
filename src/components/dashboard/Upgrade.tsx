import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Upgrade = () => {
  return (
    <div className="mt-auto p-4">
      <Card>
        <CardHeader className="p-2 md:pt-0 md:p-4">
          <CardTitle className="text-xl">Upgrade to Pro</CardTitle>
          <CardDescription className="text-xs">
            Unlock all features and get unlimited access to our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:p-4 md:pt-0">
          <Button className="w-full" size="sm">
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upgrade;

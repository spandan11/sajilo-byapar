import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  description: string;
};

const Heading = ({ title, description }: HeaderProps) => {
  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  }
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;

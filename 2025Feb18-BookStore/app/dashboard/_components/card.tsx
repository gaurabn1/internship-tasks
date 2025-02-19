import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardDashboardProps } from "@/types/book";



function CardDashboard({ title, description, content }: CardDashboardProps) {
  return (
    <>
      <Card>
        <CardHeader className="pb-0">
          <CardDescription>
            <p className="font-light text-sm text-black" >{description}</p>
          </CardDescription>
          <CardTitle>
            <h2 className="text-2xl">+{title}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs">{content}</p>
        </CardContent>
      </Card>
    </>
  )
};

export default CardDashboard;

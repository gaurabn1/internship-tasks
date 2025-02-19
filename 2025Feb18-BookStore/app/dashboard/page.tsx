import { FetchCardData } from "@/lib/card-data";
import BarComponent from "./_components/bar-chart";
import CardDashboard from "./_components/card";
import PieChartComponent from "./_components/pie-chart";
import { CardData } from "./_types/card_data";


export default async function Page() {

  const fetchedData = await FetchCardData();
  const data: CardData = fetchedData ?? {};


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {
          Object.entries(data).map(([key, value]) => (
            <div className="aspect-[16/4] rounded-xl" key={key}>
              <CardDashboard title={value.title} description={value.description} content={value.content} />
            </div>
          ))
        }
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
          <BarComponent />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
          <PieChartComponent />
        </div>
      </div>
    </div>
  )
}

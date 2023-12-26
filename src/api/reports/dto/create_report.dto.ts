export class CreateReportDto{
    requests: number;

    impressions: number;

    supply_aid: number;

    demand_aid: number | null;

    //extra: string | null; //Check extra data fields required that will come from broker
}
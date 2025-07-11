export interface StatisticItem {
  subject: string;
  excellent: number;
  good: number;
  average: number;
  weak: number;
}

export interface StatisticResponse {
  statisticsList: StatisticItem[];
}

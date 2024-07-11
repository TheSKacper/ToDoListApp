export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  finish: boolean;
  process: string;
  priority: string;
  date: Date;
}

export interface TaskResponse {
  title: string;
  description: string;
  category: string;
  finish: boolean;
  process: string;
  priority:string,
  date:Date
}

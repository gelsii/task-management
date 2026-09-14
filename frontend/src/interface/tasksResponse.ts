export type tasksResponse = {
  detail: Array<{
    _id: string
    email: string;
    task_date: string;
    task_type: string;
    task_content: string;
    task_status: string;
  }>;
};

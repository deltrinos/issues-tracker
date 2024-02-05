import { Issue, IssueStatus, Problem } from "../../models/models";

export interface IssueRepository {
    create(issue: Issue): Promise<Issue>;
    changeStatus(id: string, status: IssueStatus): Promise<Issue>;
}
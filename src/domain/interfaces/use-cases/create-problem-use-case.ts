import { CreateIssueRequest, Problem } from "../../models/models";

export interface CreateProblemUseCase {
    execute(issues: CreateIssueRequest[]): Promise<Problem>;
}
import { Issue, Problem, Ticket } from "../../domain/models/models";

export interface DataSource {
    createIssue(issue: Issue): Promise<Issue>
    getIssue(id: string): Promise<Issue | null>

    createProblem(pb: Problem): Promise<Problem>
    updateProblem(pb: Problem): Promise<Problem>
    getProblem(id: string): Promise<Problem | null>
    getLastProblem(): Promise<Problem | null>

    createTicket(problemId: string, ticket: Ticket): Promise<Ticket>
    updateTicket(problemId: string, ticket: Ticket): Promise<Ticket>
    getTicket(problemId: string): Promise<Ticket | null>
}
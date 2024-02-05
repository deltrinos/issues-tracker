import { Issue, Problem, Ticket } from "../../domain/models/models";
import { DataSource } from "../interfaces/data-source";



export class MemoryDataSource implements DataSource {
    private issues:{ [key:string]:Issue } = {}
    private issuesId = 1;

    private problems:{ [key:string]:Problem } = {}
    private problemId = 1;

    private tickets:{ [key:string]:Ticket } = {}

    async createIssue(issue: Issue): Promise<Issue> {
        if (issue.Id === undefined) {
            issue.Id = (this.issuesId++).toString()
        }
        this.issues[issue.Id] = issue
        return issue
    }
    async getIssue(id: string): Promise<Issue | null> {
        const issue = this.issues[id]
        return issue
    }

    async createProblem(pb: Problem): Promise<Problem> {
        if (pb.Id === undefined) {
            pb.Id = (this.problemId++).toString()
        }
        this.problems[pb.Id] = pb
        return pb
    }
    async updateProblem(pb: Problem): Promise<Problem> {
        if (pb.Id === undefined) {
            throw new Error("unable to update problem without id")
        }
        this.problems[pb.Id] = pb
        return pb
    }
    async getProblem(id: string): Promise<Problem | null> {
        const pb = this.problems[id]
        return pb
    }
    async getLastProblem(): Promise<Problem | null> {
        if (this.problemId > 1) {
            return this.problems[this.problemId - 1]
        }
        return null
    }

    async createTicket(problemId: string, ticket: Ticket): Promise<Ticket> {
        if (this.tickets[problemId]) {
            throw new Error(`ticket for problem ${problemId} is already created`)
        }
        this.tickets[problemId] = ticket
        return ticket
    }
    async updateTicket(problemId: string, ticket: Ticket): Promise<Ticket> {
        this.tickets[problemId] = ticket
        return ticket
    }
    async getTicket(problemId: string): Promise<Ticket | null> {
        return this.tickets[problemId]
    }
}
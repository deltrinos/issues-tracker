import { DataSource } from "../../../src/data/interfaces/data-source"
import { MemoryDataSource } from "../../../src/data/memory/memory-data-source"
import { NewIssue, NewProblem, NewThirdPartyApp1Ticket, ProblemStatus } from "../../../src/domain/models/models"
import { ProblemRepositoryImpl } from "../../../src/domain/repositories/problem-repository"

describe("Memory DataSource", () => {

    const data:DataSource = new MemoryDataSource()

    test("issue", async () => {
        const issue = await data.createIssue(NewIssue("video", "category", 42, "comment"))
        expect(issue).toBeDefined()
        expect(issue.Id).toBeDefined()
        if (issue.Id) {
            const retrieveIssue = await data.getIssue(issue.Id)
            expect(retrieveIssue).toBeDefined()
            expect(retrieveIssue?.category).toEqual("category")
            expect(retrieveIssue?.video).toEqual("video")
            expect(retrieveIssue?.userId).toEqual(42)
            expect(retrieveIssue?.comment).toEqual("comment")
        }
    })
    test("problem", async () => {
        const problem = await data.createProblem(NewProblem([]))
        expect(problem).toBeDefined()
        expect(problem.Id).toBeDefined()
        if (problem.Id) {
            const retrieveProblem = await data.getProblem(problem.Id)
            expect(retrieveProblem).toBeDefined()
            expect(retrieveProblem?.Id).toBeDefined()
            expect(retrieveProblem?.status).toEqual(ProblemStatus.pending)
        }
    })
    test("ticket", async () => {
        const ticket = await data.createTicket("1", NewThirdPartyApp1Ticket("1"))
        expect(ticket).toBeDefined()

        const retrieveIssue = await data.getTicket("1")
        expect(retrieveIssue).toBeDefined()
    })
})
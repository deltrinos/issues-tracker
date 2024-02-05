import request from "supertest";
import Endpoints from "../../../src/infra/routers/create-router";
import server from "../../../src/server";
import { CreateProblemUseCase } from "../../../src/domain/interfaces/use-cases/create-problem-use-case";
import { ChangeProblemStatusUseCase } from "../../../src/domain/interfaces/use-cases/change-problem-status-use-case copy";
import { TicketUseCase } from "../../../src/domain/interfaces/use-cases/ticket-use-case";
import { CreateIssueRequest, NewProblem, NewThirdPartyApp1Ticket, Problem, ProblemStatus, Ticket } from "../../../src/domain/models/models";




class MockCreateProblemUseCase implements CreateProblemUseCase {
    execute(issues: CreateIssueRequest[]): Promise<Problem> {
        throw new Error("Method not implemented.");
    }
}

class MockChangeProblemStatusUseCase implements ChangeProblemStatusUseCase {
    changeStatus(newStatus: ProblemStatus): Promise<Problem> {
        throw new Error("Method not implemented.");
    }
}

class MockTicketUseCase implements TicketUseCase {
    create(problemId: string): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
    update(problemId: string): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
    close(problemId: string): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
}

describe("Router", () => {

    let mockCreateProblemUseCase: CreateProblemUseCase = new MockCreateProblemUseCase()
    let mockChangeProblemStatusUseCase: ChangeProblemStatusUseCase = new MockChangeProblemStatusUseCase()
    let mockApp1TicketUseCase: TicketUseCase = new MockTicketUseCase()
    let mockApp2TicketUseCase: TicketUseCase = new MockTicketUseCase()

    beforeAll(() => {
        server.use("/", Endpoints(
            mockCreateProblemUseCase,
            mockChangeProblemStatusUseCase,
            mockApp1TicketUseCase,
            mockApp2TicketUseCase,
        ))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })


    describe("create problem", () => {
        test("POST /issues", async () => {
            const InputData = 
            [
                {
                        "video": "video-1234",
                        "category": "news",
                        "userId": 12345,
                        "comment": "issue #1"
                },
                {
                        "video": "video-1234",
                        "category": "news",
                        "userId": 345234,
                        "comment": "issue #1"
                },
                {
                        "video": "video-1234",
                        "category": "news",
                        "userId": 424200,
                        "comment": "issue #1"
                },
                {
                        "video": "video-2435",
                        "category": "games",
                        "userId": 345345,
                        "comment": "issue #1"
                }
        ]
            jest.spyOn(mockCreateProblemUseCase, "execute").mockImplementation(() => Promise.resolve(NewProblem([])))
            const response = await request(server).post("/issues").send(InputData)
            expect(response.status).toBe(200)
        });

        test("POST /issues returns 500 on use case error", async () => {
            const InputData = [ { "toto": "n_importe_quoi"} ]
            jest.spyOn(mockCreateProblemUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/issues").send(InputData)
            expect(response.status).toBe(500)
        });
    })


    describe("change status", () => {
        test("POST /change-status/ready", async () => {
            jest.spyOn(mockChangeProblemStatusUseCase, "changeStatus").mockImplementation(() => Promise.resolve(NewProblem([])))
            const response = await request(server).post("/change-status/ready").send(undefined)
            expect(response.status).toBe(200)
        });

        test("POST /change-status/unknown", async () => {
            jest.spyOn(mockChangeProblemStatusUseCase, "changeStatus").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/issues").send(undefined)
            expect(response.status).toBe(500)
        });
    })

    describe("create ticket", () => {
        test("POST /create-ticket/ThirdPartyApp1/1", async () => {
            jest.spyOn(mockApp1TicketUseCase, "create").mockImplementation(() => Promise.resolve(NewThirdPartyApp1Ticket("1")))
            const response = await request(server).post("/create-ticket/ThirdPartyApp1/1").send(undefined)
            expect(response.status).toBe(200)
        });

        test("POST /create-ticket/ThirdPartyApp1/1", async () => {
            jest.spyOn(mockApp1TicketUseCase, "create").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/create-ticket/ThirdPartyApp1/1").send(undefined)
            expect(response.status).toBe(500)
        });
    })
    describe("update ticket", () => {
        test("POST /create-ticket/ThirdPartyApp1/1", async () => {
            jest.spyOn(mockApp1TicketUseCase, "update").mockImplementation(() => Promise.resolve(NewThirdPartyApp1Ticket("1")))
            const response = await request(server).post("/update-ticket/ThirdPartyApp1/1").send(undefined)
            expect(response.status).toBe(200)
        });

        test("POST /create-ticket/ThirdPartyApp1/1", async () => {
            jest.spyOn(mockApp1TicketUseCase, "update").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/update-ticket/ThirdPartyApp1/1").send(undefined)
            expect(response.status).toBe(500)
        });
    })
    describe("close ticket", () => {
        test("POST /create-ticket/ThirdPartyApp1/1", async () => {
            jest.spyOn(mockApp1TicketUseCase, "close").mockImplementation(() => Promise.resolve(NewThirdPartyApp1Ticket("1")))
            const response = await request(server).post("/close-ticket/ThirdPartyApp1/1").send(undefined)
            expect(response.status).toBe(200)
        });

        test("POST /create-ticket/ThirdPartyApp1/1", async () => {
            jest.spyOn(mockApp1TicketUseCase, "close").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/close-ticket/ThirdPartyApp1/1").send(undefined)
            expect(response.status).toBe(500)
        });
    })

})
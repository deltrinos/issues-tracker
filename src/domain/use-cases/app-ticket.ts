import { ProblemRepository } from "../interfaces/repositories/problem-repository";
import { TicketRepository } from "../interfaces/repositories/ticket-repository";
import { TicketUseCase } from "../interfaces/use-cases/ticket-use-case";
import { ThirdPartyApp1Ticket, Ticket } from "../models/models";




export class AppTicket implements TicketUseCase {
    problemRepo: ProblemRepository
    ticketRepo: TicketRepository
    constructor(problemRepository: ProblemRepository, ticketRepository: TicketRepository) {
        this.problemRepo = problemRepository
        this.ticketRepo = ticketRepository
    }

    async create(problemId: string): Promise<Ticket> {
        const statusOk = await this.problemRepo.isReady(problemId)
        if (!statusOk) {
            throw new Error(`problem ${problemId} status is not ready`)
        }
        return await this.ticketRepo.create(problemId)
    }
    async update(problemId: string): Promise<Ticket> {
        const statusOk = await this.problemRepo.isOpen(problemId)
        if (!statusOk) {
            throw new Error(`problem ${problemId} status is not open`)
        }
        return await this.ticketRepo.update(problemId)
    }
    async close(problemId: string): Promise<Ticket> {
        const statusOk = await this.problemRepo.isClosed(problemId)
        if (!statusOk) {
            throw new Error(`problem ${problemId} status is not closed`)
        }
        return await this.ticketRepo.close(problemId)
    }

}
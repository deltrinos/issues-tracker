import { DataSource } from "../../data/interfaces/data-source"
import { TicketRepository } from "../interfaces/repositories/ticket-repository"
import { NewThirdPartyApp1Ticket, ThirdPartyApp1Ticket, Ticket } from "../models/models"





export class App1TicketRepositoryImpl implements TicketRepository {
    private data: DataSource

    constructor(data: DataSource) {
        this.data = data
    }

    async create(problemId: string): Promise<Ticket> {
        return await this.data.createTicket(problemId, NewThirdPartyApp1Ticket(problemId))
    }
    async update(problemId: string): Promise<Ticket> {
        const ticket = await this.data.getTicket(problemId)
        if (!ticket) {
            throw new Error(`unable to found ticket for problem ${problemId}`)
        }
        const appTicket = ticket as ThirdPartyApp1Ticket
        appTicket.count++
        return await this.data.updateTicket(problemId, appTicket)
    }
    async close(problemId: string): Promise<Ticket> {
        const ticket = await this.data.getTicket(problemId)
        if (!ticket) {
            throw new Error(`unable to found ticket for problem ${problemId}`)
        }
        const appTicket = ticket as ThirdPartyApp1Ticket
        appTicket.myStatus = 'resolved'
        return await this.data.updateTicket(problemId, appTicket)
    }
}
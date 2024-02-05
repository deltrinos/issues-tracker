import { ThirdPartyApp1Ticket, ThirdPartyApp2Ticket, Ticket } from "../../models/models"

export interface TicketUseCase {
    create(problemId: string): Promise<Ticket>
    update(problemId: string): Promise<Ticket>
    close(problemId: string): Promise<Ticket>
}
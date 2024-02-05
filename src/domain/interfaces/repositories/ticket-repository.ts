import { Ticket } from "../../models/models";

export interface TicketRepository {
    create(problemId: string): Promise<Ticket>;
    update(problemId: string): Promise<Ticket>;
    close(problemId: string): Promise<Ticket>;
}
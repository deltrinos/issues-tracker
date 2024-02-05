import Endpoints from "./infra/routers/create-router"
import { CreateProblem } from "./domain/use-cases/create-problem"
import { ProblemRepositoryImpl } from "./domain/repositories/problem-repository"
import { MemoryDataSource } from "./data/memory/memory-data-source"
import { ChangeProblemStatus } from "./domain/use-cases/change-problem-status"
import { App1TicketRepositoryImpl } from "./domain/repositories/app1-ticket-repository"
import { App2TicketRepositoryImpl } from "./domain/repositories/app2-ticket-repository"
import { AppTicket } from "./domain/use-cases/app-ticket"
import server from "./server"

const store = new MemoryDataSource()
const problemRepository = new ProblemRepositoryImpl(store)
const app1TicketRepository = new App1TicketRepositoryImpl(store)
const app2TicketRepository = new App2TicketRepositoryImpl(store)

server.use("/", Endpoints(
  new CreateProblem(problemRepository),
  new ChangeProblemStatus(problemRepository),
  new AppTicket(problemRepository, app1TicketRepository),
  new AppTicket(problemRepository, app2TicketRepository),
))

const port = process.env.PORT || 8000
server.listen(port, () => {
  console.log(`now listening on http://localhost:${port}`)
})

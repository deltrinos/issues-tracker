import express, { Router, Request, Response } from 'express'
import { CreateProblemUseCase } from "../../domain/interfaces/use-cases/create-problem-use-case";
import { ChangeProblemStatusUseCase } from '../../domain/interfaces/use-cases/change-problem-status-use-case copy';
import { ProblemStatus } from '../../domain/models/models';
import { TicketUseCase } from '../../domain/interfaces/use-cases/ticket-use-case';


function errorResponse(res: Response, err:any, defaultMsg: string) {
    let message = defaultMsg
    let status = 500

    if (err instanceof Error)
        message = err.message
    res.status(status).send(message)
}

export default function Endpoints(
    createProblemUseCase: CreateProblemUseCase,
    changeProblemStatusUseCase: ChangeProblemStatusUseCase,
    app1Ticket: TicketUseCase,
    app2Ticket: TicketUseCase,
): Router {
    const router = express.Router()
    const thirdPartyTicket: { [key:string]:TicketUseCase } = {
        ThirdPartyApp1: app1Ticket, 
        ThirdPartyApp2: app2Ticket,
    }

    // Task 1
    router.post("/issues", async (req: Request, res: Response) => {
        try {
            const problem = await createProblemUseCase.execute(req.body)
            res.send(problem)
        } catch (err) {
            errorResponse(res, err, "failed to create problem")
        }
    })

    // Task 2
    router.post("/change-status/:status", async (req: Request, res: Response) => {
        try {
            const newStatus = req.params.status as ProblemStatus
            if (!Object.values(ProblemStatus).includes(newStatus)) {
                throw new Error(`${newStatus} is not a valid problem status`)
            }
            const problem = await changeProblemStatusUseCase.changeStatus(newStatus)
            res.send(problem)
        } catch (err) {
            errorResponse(res, err, "failed to change problem status")
        }
    })

    // Task 3
    router.post("/create-ticket/:thirdParty/:problemId", async (req: Request, res: Response) => {
        try {
            if (!thirdPartyTicket[req.params.thirdParty]) {
                throw new Error(`unknown third party ${req.params.thirdParty}`)
            }
            const ticket = await thirdPartyTicket[req.params.thirdParty].create(req.params.problemId)
            res.send(ticket)
        } catch (err) {
            errorResponse(res, err, "failed to create ticket")
        }
    })

    // Task 4
    router.post("/update-ticket/:thirdParty/:problemId", async (req: Request, res: Response) => {
        try {
            if (!thirdPartyTicket[req.params.thirdParty]) {
                throw new Error(`unknown third party ${req.params.thirdParty}`)
            }
            const ticket = await thirdPartyTicket[req.params.thirdParty].update(req.params.problemId)
            res.send(ticket)
        } catch (err) {
            errorResponse(res, err, "failed to update ticket")
        }
    })

    // Task 5
    router.post("/close-ticket/:thirdParty/:problemId", async (req: Request, res: Response) => {
        try {
            if (!thirdPartyTicket[req.params.thirdParty]) {
                throw new Error(`unknown third party ${req.params.thirdParty}`)
            }
            const ticket = await thirdPartyTicket[req.params.thirdParty].close(req.params.problemId)
            res.send(ticket)
        } catch (err) {
            errorResponse(res, err, "failed to close ticket")
        }
    })

    return router
}
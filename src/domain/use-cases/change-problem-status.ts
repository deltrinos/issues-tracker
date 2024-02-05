import { ProblemRepository } from "../interfaces/repositories/problem-repository"
import { ChangeProblemStatusUseCase } from "../interfaces/use-cases/change-problem-status-use-case copy"
import { CreateProblemUseCase } from "../interfaces/use-cases/create-problem-use-case"
import { CreateIssueRequest, NewIssue, NewProblem, Problem, ProblemIssuesGroup, ProblemStatus } from "../models/models"

export class ChangeProblemStatus implements ChangeProblemStatusUseCase {
    problemRepo: ProblemRepository
    constructor(problemRepository: ProblemRepository) {
        this.problemRepo = problemRepository
    }

    async changeStatus(newStatus: ProblemStatus): Promise<Problem> {
        return this.problemRepo.changeStatus(newStatus)
    }

}
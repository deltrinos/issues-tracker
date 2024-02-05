import { ProblemRepository } from "../interfaces/repositories/problem-repository"
import { CreateProblemUseCase } from "../interfaces/use-cases/create-problem-use-case"
import { CreateIssueRequest, NewIssue, NewProblem, Problem, ProblemIssuesGroup, ProblemStatus } from "../models/models"

export class CreateProblem implements CreateProblemUseCase {
    problemRepo: ProblemRepository
    constructor(problemRepository: ProblemRepository) {
        this.problemRepo = problemRepository
    }

    async execute(issues: CreateIssueRequest[]): Promise<Problem> {

        // issues should be grouped by video and category to create a Problem
        const groups: { [key:string]:ProblemIssuesGroup } = {}
        issues.map((i) => {
            if (!i.video || !i.category) {
                throw new Error("please check your data, video and category is empty!")
            }
            const key = i.video + i.category
            const issueModel = NewIssue(i.video, i.category, i.userId, i.comment)
            if (key in groups) {
                groups[key].issues.push(issueModel)
            } else {
                groups[key] = {
                    video: i.video,
                    category: i.category,
                    issues: [issueModel],
                }
            }
        })

        return await this.problemRepo.create(NewProblem(Object.values(groups)))
    }
}
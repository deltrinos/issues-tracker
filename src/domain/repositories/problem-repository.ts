import { stat } from "fs";
import { DataSource } from "../../data/interfaces/data-source";
import { ProblemRepository } from "../interfaces/repositories/problem-repository";
import { IssueStatus, Problem, ProblemStatus } from "../models/models";



export class ProblemRepositoryImpl implements ProblemRepository {
    private data: DataSource

    constructor(data: DataSource) {
        this.data = data
    }
    async create(pb: Problem): Promise<Problem> {
        return await this.data.createProblem(pb)
    }


    private statusCanChange(curStatus:ProblemStatus, newStatus:ProblemStatus): boolean {
        if (curStatus == newStatus) {
            return false
        }
        if (curStatus == ProblemStatus.pending ||
            curStatus == ProblemStatus.ready && (newStatus == ProblemStatus.open || newStatus == ProblemStatus.closed) ||
            curStatus == ProblemStatus.open && newStatus == ProblemStatus.closed) {
                return true
            }
        return false
    }

    async changeStatus(status: ProblemStatus): Promise<Problem> {
        const pb = await this.data.getLastProblem()
        if (!pb) {
            throw new Error(`can not find last problem`)
        }
        if (pb.status == status) {
            throw new Error(`problem status is already ${status}`)
        }

        if (this.statusCanChange(pb.status, status)) {
            pb.status = status

            // Issue statuses will be updated depending on the Problem’s status
            if (pb.status == ProblemStatus.open || pb.status == ProblemStatus.closed) {
                pb.groups.map((g) => {
                    g.issues.map((i) => {
                        i.status = IssueStatus.grouped
                    })
                })
            }
            
            return await this.data.updateProblem(pb)
        }
        throw new Error(`can't change status ${pb.status} to ${status}`)
    }

    async isReady(id: string): Promise<boolean> {
        const pb = await this.data.getProblem(id)
        return pb?.status == ProblemStatus.ready || false
    }
    async isOpen(id: string): Promise<boolean> {
        const pb = await this.data.getProblem(id)
        return pb?.status == ProblemStatus.open || false
    }
    async isClosed(id: string): Promise<boolean> {
        const pb = await this.data.getProblem(id)
        return pb?.status == ProblemStatus.closed || false
    }
} 
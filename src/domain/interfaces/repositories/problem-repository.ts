import { Problem, ProblemStatus } from "../../models/models";

export interface ProblemRepository {
    create(problem: Problem): Promise<Problem>;
    changeStatus(status: ProblemStatus): Promise<Problem>;

    isReady(id: string): Promise<boolean>;
    isOpen(id: string): Promise<boolean>;
    isClosed(id: string): Promise<boolean>;
}
import { Problem, ProblemStatus } from "../../models/models";

export interface ChangeProblemStatusUseCase {
    changeStatus(newStatus: ProblemStatus): Promise<Problem>
}
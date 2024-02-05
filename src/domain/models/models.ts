
export type CreateIssueRequest = {
    video: string;
    category: string;
    userId: number;
    comment: string;
}


export enum IssueStatus {
    waiting = "waiting",
    grouped = "grouped",
}


export type Issue = {
    Id?: string;
    status: IssueStatus;

    video: string;
    category: string;
    userId: number;
    comment: string;
};

export function NewIssue(video:string, category:string, userId:number, comment:string): Issue {
    return {
        status: IssueStatus.waiting,
        video: video,
        category: category,
        userId: userId,
        comment: comment,
    }
}




export enum ProblemStatus {
    pending = "pending",
    ready = "ready",
    open = "open",
    closed = "closed",
}

export type ProblemIssuesGroup = {
    video: string
    category: string
    issues: Issue[]
}

export type Problem = {
    Id?: string
    status: ProblemStatus

    groups: ProblemIssuesGroup[]
};

export function NewProblem(groups: ProblemIssuesGroup[]): Problem {
    return {
        status: ProblemStatus.pending,
        groups: groups,
    }
}






export type Ticket = ThirdPartyApp1Ticket | ThirdPartyApp2Ticket;

export type ThirdPartyApp1Ticket = {
    problemId: string;
    myStatus: 'running' | 'resolved';
    count: number;
    owner: 'csTeam'
}
export function NewThirdPartyApp1Ticket(problemId: string): ThirdPartyApp1Ticket {
    return {
        problemId: problemId,
        myStatus: 'running',
        count: 0,
        owner: 'csTeam'
    }
}

export type ThirdPartyApp2Ticket = {
    ProblemRef: string;
    Status: 'ongoing' | 'ended';
    IssuesCount: number;
    ExternalOwner: 'csTeam'
}
export function NewThirdPartyApp2Ticket(problemId: string): ThirdPartyApp2Ticket {
    return {
        ProblemRef: problemId,
        Status: 'ongoing',
        IssuesCount: 0,
        ExternalOwner: 'csTeam'
    }
}



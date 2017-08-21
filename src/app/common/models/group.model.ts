import { IMember } from "./index";

export interface IGroup {
    id?: string,
    name: string,
    members: IMember[]
    // schedule: [{
    //     standardTrainers: IMember[],
    //     day: string,
    //     from: number,
    //     to: number
    // }]
}


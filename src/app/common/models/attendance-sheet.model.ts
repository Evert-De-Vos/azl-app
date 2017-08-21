import { IMember, IGroup } from './index';

export interface IAttendanceSheet {
    id?: string,
    group : IGroup ,
    date : Date,
    trainers : IMember[],
    attendees: IMember[]
}
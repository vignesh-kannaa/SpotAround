export class CalendarEventsModel{
    constructor(
    public title:string,
    public startTime:Date,
    public  endTime:Date,
    public allDay:boolean){}
}
export class RequestModel{
    constructor(
       
       public fromId:string,
       public toId:string,
       public startDate:string,
       public startTime:string,
       public endTime:string,
       public reqState:string,
       public reqCity:string,
       public message:string,
       public status:string
        
    ){}
    
}
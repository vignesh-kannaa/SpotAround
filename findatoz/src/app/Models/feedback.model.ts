export class FeedbackModel{
    constructor(
        public fromId:string,
        public toId:string,
        public review:string,
        public rating:number)
        {}
}
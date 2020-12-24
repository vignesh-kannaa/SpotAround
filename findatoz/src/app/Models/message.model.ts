export class MessageModel{
    constructor(
        public fromId:string,
        public toId:string,
        public message:string,
        public created_time:Date
        ){}
}
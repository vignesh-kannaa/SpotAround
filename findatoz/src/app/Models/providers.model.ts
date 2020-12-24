export class ProvidersModel{
    constructor(
        public email:string,
        public firstName:string,
        public lastName:string,
        public imagePath:string,
        public ratings:number,
        public hiredTimes:number,
        public category:string,
        public subCategory:string,
        public state:string,
        public city:string,
        public description:string,
    ){}
}
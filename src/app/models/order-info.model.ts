


export class OrderInfo {
    constructor(
        public name: string,
        public delivery: string,
        public address: string,
        public phone: string,
        public email: string,
        public pickupDate: Date,
        public pickupTime: string,
        public comments: string
    ) { }
}
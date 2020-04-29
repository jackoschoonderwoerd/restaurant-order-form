export class CourseItem {

    constructor(
        public name: string,
        public price: number,
        public description?: string,
        public imageUrl?: string,
        public amount?: number,
    ) { }

    // constructor(
    //     public value: string,
    //     public key: string,
    //     public label: string,
    //     public price: number,
    //     public name: string,
    //     public required: boolean,
    //     public order: number,
    //     public controlType: string,
    //     public type: string,
    //     public options: {key: string, value: string}[],
    //     public quantity?: number,
    //     public amount?: number,
    // ) { }


    // value: T;
    // key: string;
    // label: string;
    // price: number;
    // name: string;
    // required: boolean;
    // order: number;
    // controlType: string;
    // type: string;
    // options: {key: string, value: string}[];
  
    // constructor(options: {
    //     value?: T,
    //     key?: string,
    //     label?: string,
    //     price?: string,
    //     name?: string,
    //     required?: boolean,
    //     order?: number,
    //     controlType?: string,
    //     type?: string
    //   } = {}) {
    //   this.value = options.value;
    //   this.key = options.key || '';
    //   this.label = options.label || '';
    // //   this.price = options.price || '';
    //   this.name = options.name || '';
    //   this.required = !!options.required;
    //   this.order = options.order === undefined ? 1 : options.order;
    //   this.controlType = options.controlType || '';
    //   this.type = options.type || '';
    // }
}
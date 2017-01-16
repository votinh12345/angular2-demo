export class Product {
    goods_jan: string;
    goods_name: string;
    goods_name2: string;
    goods_model_id: string;
    goods_sim_type: string;
    goods_sim_class: string;
    goods_color: string;
    goods_size: string;
    goods_maker: string;
    goods_decr: string;
    last_upd_date: Date;
    plan_name: string;
    option_name: string;

    constructor(goods_jan = null, goods_name = null, goods_name2 = null, goods_model_id = null, goods_sim_type = null,
     goods_sim_class = null, goods_color = null, goods_size = null, goods_maker = null, goods_decr = null,
     last_upd_date = null, plan_name = null, option_name = null){
        this.goods_jan = goods_jan;
        this.goods_name = goods_name;
        this.goods_name2 = goods_name2;
        this.goods_model_id = goods_model_id;
        this.goods_sim_type = goods_sim_type;
        this.goods_sim_class = goods_sim_class;
        this.goods_color = goods_color;
        this.goods_size = goods_size;
        this.goods_maker = goods_maker;
        this.goods_decr = goods_decr;
        this.last_upd_date = last_upd_date;
        this.plan_name = plan_name;
        this.option_name = option_name;
    }
}
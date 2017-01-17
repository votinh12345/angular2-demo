
export class PlanMst {
    plan_code: string;
    plan_name: string;
    plan_desc: string;
    plan_class: string;
    plan_initial_dis: string;
    plan_start_date: Date;
    plan_end_date: Date;
    plan_type: string;
    plan_last_upd_user: string;
    plan_last_upd_date: Date;

    constructor(plan_code = null, plan_name = null, plan_desc = null, plan_class = null, plan_initial_dis = null,
     plan_start_date = null, plan_end_date = null, plan_type = null, plan_last_upd_user = null, plan_last_upd_date = null){
        this.plan_code = plan_code;
        this.plan_name = plan_name;
        this.plan_desc = plan_desc;
        this.plan_class = plan_class;
        this.plan_initial_dis = plan_initial_dis;
        this.plan_start_date = plan_start_date;
        this.plan_end_date = plan_end_date;
        this.plan_type = plan_type;
        this.plan_last_upd_user = plan_last_upd_user;
        this.plan_last_upd_date = plan_last_upd_date;
    }
}
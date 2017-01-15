export class OptionMst {
    opt_packcode: string;
    opt_packname: string;
    opt_packdesc: string;
    opt_code: string;
    opt_name: string;
    opt_desc: string;
    opt_flag: string;
    opt_class: string;
    opt_start_date: Date;
    opt_end_date: Date;
    last_upd_user: string;
    last_upd_date: Date;

    constructor(opt_packcode = null, opt_packname= null, opt_packdesc= null, opt_code= null, opt_name= null,
     opt_desc= null, opt_flag= null, opt_class= null, opt_start_date= null, opt_end_date= null, last_upd_user= null, last_upd_date= null){
        this.opt_packcode = opt_packcode;
        this.opt_packname = opt_packname;
        this.opt_packdesc = opt_packdesc;
        this.opt_code = opt_code;
        this.opt_name = opt_name;
        this.opt_desc = opt_desc;
        this.opt_flag = opt_flag;
        this.opt_class = opt_class;
        this.opt_start_date = opt_start_date;
        this.opt_end_date = opt_end_date;
        this.last_upd_user = last_upd_user;
        this.last_upd_date = last_upd_date;
    }
}
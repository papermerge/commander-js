class ActionItem {

    constructor({
        id,
        title,
        icon_class,
        condition,
        enabled=true,
        run
    }){
        this.id = id;
        this.title = title;
        this.icon_class = icon_class;
        this.condition = condition;
        this.enabled = enabled;
        this.run = run;
    }
}

export { ActionItem };
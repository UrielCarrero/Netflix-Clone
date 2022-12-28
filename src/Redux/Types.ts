export interface IUserProps {
    email:string;
    username:string;
    password:string;
}

export type IUserState = {
    registered_email: boolean;
    active: boolean;
    user: IUserProps;
    errMess: string;
    validationProcess:string;
    favorites?: Array<{
        page:string;
        category:string;
        id:number;
    }>;
}

export type IContentState = {
    content_state:{
        carousels:string;
        watch:string;
        modal:string;
        mainContent:string;
        favorites:string;
    }
    category?:string;
    Carrousels?:{
        category:string;
        isTop:boolean;
        content:
        {
        id:number;
        imgLink:string;
        topImgLink?:string;
        compatibility: string;
        clasification: string;
        seasons: string;
        keywords: Array<string>;
        trailer: string;
    }[]}[];
    mainMovie?:{
        trailer:string;
        imgLink:string;
        imgTitle:string;
        description:string;
        clasification:string;
    };
    modalMovie?:{
        id:number;
        title:string;
        imgLink:string;
        imgTitle:string;
        description:string;
        clasification:string;
        compatibility: string;
        year:string;
        seasons: number;
        cast: Array<string>;
        genres:Array<string>;
        mainGenre: string;
        authors:Array<string>;
        trailer:string;
        category:string;
    },
    playInfo?:{
        id:number;
        title:string;
        imgLink:string;
        trailer:string;
    }, 
    favorites?:{
        id:number;
        imgLink:string;
        compatibility: string;
        clasification: string;
        seasons: string;
        keywords: Array<string>;
        trailer: string;
    }[]

}


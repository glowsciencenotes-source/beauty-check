/*
====================================================

Storage

====================================================
*/

"use strict";

const STORAGE_KEY={

    RESULT:"skincheck_result",

    ANSWERS:"skincheck_answers",

    FAVORITES:"skincheck_favorites",

    SETTINGS:"skincheck_settings"

};

/*====================================================
Save
====================================================*/

function saveResult(){

    localStorage.setItem(

        STORAGE_KEY.RESULT,

        JSON.stringify(App.result)

    );

}

/*====================================================
Load
====================================================*/

function loadResult(){

    const json=

        localStorage.getItem(

            STORAGE_KEY.RESULT

        );

    if(!json){

        return null;

    }

    return JSON.parse(json);

}

/*====================================================
Answers
====================================================*/

function saveAnswers(){

    localStorage.setItem(

        STORAGE_KEY.ANSWERS,

        JSON.stringify(

            App.answers

        )

    );

}

function loadAnswers(){

    const json=

        localStorage.getItem(

            STORAGE_KEY.ANSWERS

        );

    if(!json){

        return [];

    }

    return JSON.parse(json);

}

/*====================================================
Favorite
====================================================
*/

function saveFavorite(id){

    const list=

        loadFavorites();

    if(

        !list.includes(id)

    ){

        list.push(id);

    }

    localStorage.setItem(

        STORAGE_KEY.FAVORITES,

        JSON.stringify(list)

    );

}
function loadFavorites(){

    const json=

        localStorage.getItem(

            STORAGE_KEY.FAVORITES

        );

    return json

        ?JSON.parse(json)

        :[];

}

function removeFavorite(id){

    const list=

        loadFavorites()

        .filter(

            item=>item!==id

        );

    localStorage.setItem(

        STORAGE_KEY.FAVORITES,

        JSON.stringify(list)

    );

}


/*====================================================
Settings
====================================================*/

function saveSettings(settings){

    localStorage.setItem(

        STORAGE_KEY.SETTINGS,

        JSON.stringify(settings)

    );

}

function loadSettings(){

    const json=

        localStorage.getItem(

            STORAGE_KEY.SETTINGS

        );

    return json

        ?JSON.parse(json)

        :{};

}

/*====================================================
Clear
====================================================*/

function clearStorage(){

    Object.values(

        STORAGE_KEY

    ).forEach(key=>{

        localStorage.removeItem(key);

    });

}

App.result=

createDiagnosis();

saveResult();

renderResult();

const oldResult=

loadResult();

if(oldResult){

    App.result=oldResult;

}

import React from 'react';
import DevTools from 'mobx-react-devtools';

import ArghFormFactory from './ArghForm';
import MobxReactFormDevTools from 'mobx-react-form-devtools';



const ArghApp = (props) =>{
    const nlForm = ArghFormFactory();
    MobxReactFormDevTools.register({ nlForm });
    MobxReactFormDevTools.select('nlForm');
    MobxReactFormDevTools.open(true);

    function datThing(evt){
        nlForm.createNewArticle();
    }

    function initBlah(evt){
        nlForm.initBlah()
    }

    return (
    <div>
        <button onClick={datThing}>Add an article</button>
        <button onClick={initBlah}>Init Blah with Empty Array</button>

        <DevTools />
        <MobxReactFormDevTools.UI />
    </div>);
}

export default ArghApp;

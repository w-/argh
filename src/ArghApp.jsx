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

    return (
    <div>
        <button onClick={datThing}>Add an article</button>

        <DevTools />
        <MobxReactFormDevTools.UI />
    </div>);
}

export default ArghApp;

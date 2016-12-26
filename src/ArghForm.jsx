import { extendObservable, observable, observe, action } from 'mobx';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';


const plugins = { dvr: validatorjs };

const fields = [
  'id',
  'title',
  'blah.abe',
  'blah.abe[]',
  'layout.column1',
  'layout.column1[].id',
  'layout.column1[].title',
  'layout.column1[].img_url',
  'layout.column2',
  'layout.column2[].id',
  'layout.column2[].title',
  'layout.column2[].img_url',
]

const rules = {
  'title': 'string|required|between:1,255',
  'layout.column1[].title': 'string|required|between:1,255',
  'layout.column1[].img_url': 'url|between:0,255',
  'layout.column2[].title': 'string|required|between:1,255',
  'layout.column2[].img_url': 'url|between:0,255',
}


class ArghForm extends MobxReactForm {

  onInit(form){
    // https://github.com/foxhound87/mobx-react-form/issues/178
    //form.$('layout.column1').del(0);
    //form.$('layout.column2').del(0);
  }


  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }

  initBlah() {
    this.$('blah').init({
      abe: [],
    })
  }

  createNewArticle (layoutKey='column1', idx=0) {
      let newArticle = {
          id: null,
          owner: null,
          title : 'Your Article Title goes here',
          message: '',
          img_url: 'not a url',
          attachments: [],
          newsletter: null,
          message_is_html: true,
      };

      let layout = this.get_layout_values();
      console.log('layout vals', layout)

      layout[layoutKey].splice(idx, 0, newArticle);

      console.log('this is layout', layout);
      console.log('Current Rules before update', this.state.current.props.rules);
      this.$('layout').update(layout);
      console.log('Current Rules', this.state.current.props.rules);
      console.log('col1-0 img_url', this.$('layout.column1[0].img_url').value)
      console.log('col1-0 img_url errors', this.$('layout.column1[0].img_url').errors())

      this.validate().then( (isValid)=> {
        console.log('errors', isValid, this.errors())
        console.log('col1-0 img_url isValid?', this.$('layout.column1[0].img_url').check('isValid'))
      })

      return {
          layoutKey: layoutKey,
          idx: idx,
      };
  }

  insertArticle( layoutKey, index, article) {
      this.layout[layoutKey].splice(index, 0, article);
  }

  deleteArticle( layoutKey, index) {
      this.layout[layoutKey].splice(index, 1);
  }

  get_layout_values(){
    let val = this.$('layout').value;
    if (!val['column1'].length || val['column1'].length === 0){
      val['column1'] = [];
    }
    if (!val['column2'].length || val['column2'].length === 0){
      val['column2'] = [];
    }
    return val
  }

}

function ArghFormFactory(values){
  return new ArghForm({ fields, plugins, values, rules });
}


export default ArghFormFactory;
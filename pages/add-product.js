import Head from 'next/head'
import { Toopbar, Topbar } from '../components/topbar';
import { SubmitHandler, useForm } from 'react-hook-form';
import { productFields } from '../dataTypes.tsx';
// import { dbhandler } from './api/db';
import { useEffect, useState } from 'react';

    async function getCategories(){
      const apiUrlEndpoint = 'http://localhost:3000/api/getCategories';
      const response = await fetch(apiUrlEndpoint);
      const json = await response.json();
      return json;
    }

    async function getProductAttributes(){
      const apiUrlEndpoint = 'http://localhost:3000/api/getProductAttributes';
      const response = await fetch(apiUrlEndpoint);
      const json = await response.json()
      return json;
    }

    function getObjPropByVar(object, path){
      return path.split('.').reduce ( (res, prop) => res[prop], object );
    }
    

export default function addProduct() {
  const [dataResponse, setDataResponse] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState(1);
  const [productAttributes, setProductAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);

  useEffect(() => {
    getCategories().then(categ => {
      setDataResponse(categ.results);
      setSelectedOpt(categ.results[0].id);
    });
    getProductAttributes().then(attrib => {
      if(typeof(attrib.results) == 'object'){
        var inputs = [];
          for(let key in attrib.results){
            var arr = String.prototype.split.call(attrib.results[key].values, "/|");
            inputs.push(arr.filter(e => e.length));
          }
        setProductAttributes(inputs);
        setSelectedAttribute(inputs[selectedOpt]);
      }
    });
  }, []);
  /*
const array = [[1,2], [3,4]];
const mappedArray = array.map((subarray) => subarray.map(el) );
11:59
const array = [[1,2], [3,4]];
const mappedArray = array.map((subarray) => subarray.map((singleVal) => singleVal) )

    getProductAttributes().then(attrib => {
      if(typeof(attrib.results) == 'object'){
          for(let key in attrib.results){
            let arr = String.prototype.split.call(attrib.results[key].values, "/|");
            if(attrib.results[key].id == selectedOpt) { setProductAttributes(arr.filter(e => e.length));}
          } 
      }
    });
    */

    const {
      register,
      handleSubmit,
      formState: {errors, isValid}
    } = useForm({mode: 'onBlur'});
    const requiredMsgText = "Please, submit required data";

    const categoryHandler = (event) => {
        setSelectedOpt(event.value);
        getProductAttributes().then(attrib => {
          if(typeof(attrib.results) == 'object'){
            var inputs = [];
              for(let key in attrib.results){
                var arr = String.prototype.split.call(attrib.results[key].values, "/|");
                inputs.push(arr.filter(e => e.length));
              }
            setSelectedAttribute(inputs[event.value]);
          }
        })
    }

    const onSubmit = (data) => (
      window.alert(data.name)
    );
    
    const InputTS = ({inputtype, label, name, value="", requiredMsg}) => {
      const errorMessages = getObjPropByVar(errors, name);
      const hasError = !!(errors && errorMessages);
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input {...register(name, {required: requiredMsg?requiredMsg:false, pattern: (inputtype=='number')?/^\d+$/:null})} type={inputtype} name={name} id={name} defaultValue={value}/>
          {hasError && <div className='form_error'>{errorMessages.message}</div>}
        </div>
      );
    };

    console.log(selectedAttribute);

    //{productAttributes.map( attribute => <InputTS inputtype="text" key={attribute.id}  label={attribute.name} name={attribute} />)}
    //<InputTS inputtype="submit" name="submit" value="Save" />
    return (
      <div className='pagewrapper verticalcenter'>
      <Topbar>
      </Topbar>
        <form id="product_form" onSubmit={handleSubmit(onSubmit)}>
          <InputTS inputtype="text" label="SKU" name="sku" requiredMsg={requiredMsgText} />
          <InputTS inputtype="text" label="Name" name="name" requiredMsg={requiredMsgText} />
          <InputTS inputtype="number" label="Price" name="price" requiredMsg={requiredMsgText} />
          <select name="category_id" onChange={categoryHandler}>
            {dataResponse.map( option => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>
            {selectedAttribute.map( (attribute) => { return (<InputTS inputtype="text" key={attribute}  label={attribute} name={attribute} />)}  )}
          <input name="submit" type="submit" value="Add" />
          <input name="submit_condition" type="hidden" value="1" />
        </form>
      </div>
    )
}
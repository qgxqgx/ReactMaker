/*
组件工厂
提供组件和属性设置
*/

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

//所有支持的生成的类
var Elements = [
  {componentType:View , name:'View',desc:'-',subChild:[]},
  {componentType:Text , name:'Text',desc:'-',subChild:[]},
];

function deepCopy(source) {
  let result={};
  for (var key in source) {
      result[key] = typeof source[key]==='object' ? deepCopy(source[key]): source[key];
  }
  return result;
};

export default {

  getAllElements(){
    return Elements;
  },

  getRootItem(){
    return this.getItem(View);
  },

  getItem(itemType){
    for (let i = 0; i < Elements.length; i++) {
      if (Elements[i].componentType == itemType) {
        let mod = Elements[i];
        mod = deepCopy(mod);
        mod.subChild = [];
        return mod;
      }
    }
    console.log('failed to find elements');
  },

};


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';

import ComponentFactory from './ComponentFactory'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'



var Action = {
  Action_None : 0,
  Action_InsertNext : 1,
  Action_InsertSubChild:2,
  Action_RemoveItem : 3,
}

//操作面板
export default class ControlPannel extends Component {
  constructor(props){
    super(props);
    this.action = Action.Action_None;
  }

  render() {
    return (
      <View style={{flexDirection:'row'}} >
        <TouchableHighlight onPress={this._insertElement.bind(this)}>
          <Text>【插入元素】</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._insertElementAsSon.bind(this)}>
          <Text>【增加子元素】</Text>
        </TouchableHighlight>

      </View>
    );
  }

  _insertElement(){
    if (this.props.domTreeData.currentFocus == undefined) {
      React.Alert.alert('提示', '请在左侧点击操作的对象', ['ok']);
      return;
    }

    this.action = Action.Action_InsertNext;
    //弹出控件面板
    this._showComponentChoose();
  }
  _insertElementAsSon(){
    if (this.props.domTreeData.currentFocus == undefined) {
      React.Alert.alert('提示', '请在左侧点击操作的对象', ['ok']);
      return;
    }

    this.action = Action.Action_InsertSubChild;
    //弹出控件面板
    this._showComponentChoose();
  }

  _showComponentChoose(){
    var btns = [];
    var Elements = ComponentFactory.getAllElements();
    for (let i = 0; i < Elements.length; i++) {
      let item = {text:Elements[i].name , onPress:()=>(this._chooseElement(Elements[i]))} ;
      btns.push(item);
    }

    React.Alert.alert('提示', '请选择要添加的类型',
     btns,
    );
  }

  _chooseElement(ele){
    if(this.props.domTreeData.currentFocus == undefined){
      React.Alert.alert('提示', '未选中左侧元素',
       'ok',
      );
      return;
    }

    //创建操作,插入到 dom 树下面
    var itemCreate = ComponentFactory.getItem(ele.componentType);
    if (this.action == Action.Action_InsertSubChild) {
      itemCreate.parent = this.props.domTreeData.currentFocus;
      itemCreate.parent.subChild.push(itemCreate);
      this.action = Action.Action_None;
    }
    if (this.action == Action.Action_InsertNext) {
      if(this.props.domTreeData.currentFocus.parent == undefined){
        Alert.alert('提示','根节点只能有一个哦','确定');
        return;
      }
      itemCreate.parent = this.props.domTreeData.currentFocus.parent;
      itemCreate.parent.subChild.push(itemCreate);
      this.action = Action.Action_None;
    }

    //通知dom树刷新
    RCTDeviceEventEmitter.emit('newItemCreated',itemCreate);

  }




}

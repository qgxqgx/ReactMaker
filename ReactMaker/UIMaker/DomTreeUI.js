
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

import ComponentFactory from './ComponentFactory'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'


export default class DomTreeUI extends Component {
  constructor(props){
    super(props);

    this.state = {
      flushTimes:1,
    };

    var me = this;
    RCTDeviceEventEmitter.addListener('newItemCreated',function(text){
       me.setState({
        flushTimes : ++me.state.flushTimes
        });
    });
  }

  render() {
    return (
      <View style={{flex:1}} >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.createItems()}
        </ScrollView>
      </View>
    );
  }

  createItems(){
    var list = [];
    return this.createDomItems(list,this.props.domTreeData,0,0,'start');
  }

  createDomItems(list,tree,level=0,itemIndex=0,iden='0'){
    //return a list
    var node = this.getRowItem(tree,level,itemIndex,iden);
    list.push(node);

    if (tree.subChild.length > 0) {
      for (let i = 0; i < tree.subChild.length; i++) {
        this.createDomItems(list,tree.subChild[i],level+1,i,iden+i);
      }
    }

    return list;
  }

  getRowItem(treeNode,level,itemIndex=0,superidenfiy='0'){
    let nodeData = treeNode;
    var text = nodeData.name + '|' + nodeData.desc;
    var key =  level + ' ' + superidenfiy + ' ' + itemIndex;
    var isSelected = nodeData.isSelected == true;
    var backColor = isSelected ? 'gray':'white' ;
    var node = (<TouchableWithoutFeedback onPress={()=>this._onTouch(nodeData)} key={key}>
      <View style={{backgroundColor:backColor,height:20}} >
        <Text style={{color:'black',fontSize:10,marginLeft:(level*4)}} >{text}</Text>
      </View>
    </TouchableWithoutFeedback>);
    return node;

  }

  //点击事件
  _onTouch(data){
      if (data == this.props.domTreeData.currentFocus) {
        return;
      }

      if (this.props.domTreeData.currentFocus !== undefined) {
        this.props.domTreeData.currentFocus.isSelected = false;
      }
      this.props.domTreeData.currentFocus = data;
      this.props.domTreeData.currentFocus.isSelected = true;
      this.setState({flushTimes:++this.state.flushTimes});

      //显示元素的属性
      //通知属性面板刷新
      RCTDeviceEventEmitter.emit('onTreeFocus',this.props.domTreeData.currentFocus);
  }


}

//
var styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20
    }
});

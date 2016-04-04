
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import ReactComponent from 'ReactComponent'
import ComponentFactory from './ComponentFactory'

export default class PreviewPannel extends Component {
  constructor(props){
    super(props);

    this.state = {
      flushTimes:0,
    };

    //监听
    var that = this;
    RCTDeviceEventEmitter.addListener('needUpdatePreview',function(text){
        //刷新属性面板

        that.setState({
          flushTimes : ++that.state.flushTimes
        });
    });


  }

  getPreviewNode(TreeNode,key){

    var childList = [];
    for (var i = 0; i < TreeNode.subChild.length; i++) {
      var item = TreeNode.subChild[i];
      childList.push(this.getPreviewNode(item,key+'|'+i));
    }

    var style = {};
    if(TreeNode.editStyles != undefined){
        style = ComponentFactory.deepCopy(TreeNode.editStyles);
        //style = TreeNode.editStyles;  不能这么赋值，不然 TreeNode.editStyles 就被锁定住了，属性不能再修改
    }

    return (
    <TreeNode.componentType key={key} style={style}>
      {childList}
    </TreeNode.componentType>
  );

  }

  render() {

    var node = this.getPreviewNode(this.props.domTreeData,'start');

    return (
      <View style={{}} >
          {node}
      </View>
    );
  }
}

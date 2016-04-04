/**
 * DesignFrame
 *
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ControlPannel from './ControlPannel';
import DomTreeUI from './DomTreeUI';
import PropertyPannel from './PropertyPannel';
import PreviewPannel from './PreviewPannel';
import ComponentFactory from './ComponentFactory'

//编辑框，左边是dom树，中间是预览，右边是属性编辑，顶上是常用操作，底下是常用控件
export default class DesignFrame extends Component {
  constructor(props){
    super(props);

    this.domTreeData = ComponentFactory.getRootItem();

  }


  render() {
    return (
      <View style={styles.MainFrame}>
        <View comment='左侧dom tree' style={{flex:1}}>
          <DomTreeUI ref='domTree' domTreeData={this.domTreeData}/>
        </View>
        <View style={{flex:3}}>
          <View comment='顶部操作控制器面板' style={{flex:1,backgroundColor:'pink'}}>
            <ControlPannel ref='controlPannel'  domTreeData={this.domTreeData}/>
          </View>
          <View comment='中间预览区' domTreeData={this.domTreeData} style={{flex:9,backgroundColor:'green'}}>
            <PreviewPannel ref='previewPannel' domTreeData={this.domTreeData}/>
          </View>
          <View comment='底部属性区' style={{flex:4,backgroundColor:'gray'}}>
            <PropertyPannel ref='propertyPannel' domTreeData={this.domTreeData}/>
          </View>
        </View>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  MainFrame:{
    flex:1,
    flexDirection:'row',
    marginTop:20
  },
});
